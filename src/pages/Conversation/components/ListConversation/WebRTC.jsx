import { useEffect, useRef, useState } from 'react';
import hubConnection, {
  startConnection,
  acceptCall,
} from '../../../../services/HubConnection';
import { HubConnection } from '@microsoft/signalr';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
export default function WebRTC() {
  // State để lưu thông tin cuộc gọi đến (người gọi đến)
  const [incomingCaller, setIncomingCaller] = useState(null);
  // State để lưu thông tin người dùng được random (người nhận cuộc gọi)
  const [selectedUser, setSelectedUser] = useState(null);
  // State để đánh dấu cuộc gọi đã được chấp nhận (đang hoạt động)
  const [activeCall, setActiveCall] = useState(false);
  const { selectedUserAfterAcceptedCall, setSelectedUserAfterAcceptedCall } =
    useState(null);
  const {
    incomingCallerAfterAcceptedCall,
    setIncomingCallerAfterAcceptedCall,
  } = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initConnection = async () => {
      await startConnection();
      try {
        await hubConnection.invoke('GetRandomUser');
      } catch (err) {
        console.error('❌ Lỗi khi gọi GetRandomUser:', err);
      }
    };

    initConnection();

    const handleIncomingCall = (callerId) => {
      console.log('📞 Incoming call from:', callerId);
      setIncomingCaller(callerId);
    };
    hubConnection.on('IncomingCall', handleIncomingCall);

    const handleRandomUserSelected = (targetConnectionId) => {
      console.log('🔍 Random user selected:', targetConnectionId);
      setSelectedUser(targetConnectionId);
    };
    hubConnection.on('RandomUserSelected', handleRandomUserSelected);

    const handleNoAvailableUsers = () => {
      console.log('❌ No available users');
      setSelectedUser(null);
    };
    hubConnection.on('NoAvailableUsers', handleNoAvailableUsers);

    // Khi cuộc gọi được chấp nhận, nhận sự kiện "CallAccepted" từ server
    const handleCallAccepted = (partnerId) => {
      console.log('✅ Call accepted with:', partnerId);
      setActiveCall(true);
      // Optionally, clear selectedUser nếu không cần hiển thị nữa
      // setSelectedUserAfterAcceptedCall(selectedUser);
      setSelectedUser(null);
    };
    hubConnection.on('CallAccepted', handleCallAccepted);

    // Lắng nghe sự kiện CallEnded từ server
    const handleCallEnded = () => {
      console.log('📴 Cuộc gọi đã kết thúc');
      // Đóng kết nối WebRTC (nếu đang mở) và reset UI
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      setIncomingCaller(null);
      setSelectedUser(null);
      setActiveCall(false);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    };
    hubConnection.on('CallEnded', handleCallEnded);

    return () => {
      hubConnection.off('IncomingCall', handleIncomingCall);
      hubConnection.off('RandomUserSelected', handleRandomUserSelected);
      hubConnection.off('NoAvailableUsers', handleNoAvailableUsers);
      hubConnection.off('CallEnded', handleCallEnded);
    };
  }, []);

  const createPeerConnection = async () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && (selectedUser || incomingCaller)) {
        const targetId = selectedUser || incomingCaller;
        hubConnection.invoke(
          'SendCandidate',
          targetId,
          JSON.stringify(event.candidate)
        );
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    stream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, stream));
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };

  // Khi bấm nút "Start Call" => gọi người dùng được random (selectedUser)
  const startCall = async () => {
    if (!selectedUser) {
      console.log('Chưa có người dùng được chọn để gọi.');
      return;
    }
    await createPeerConnection();
    hubConnection.invoke('StartCall', selectedUser);
  };

  // Khi nhận được cuộc gọi, bấm nút "Accept Call" để chấp nhận
  const acceptIncomingCall = async () => {
    if (incomingCaller) {
      await createPeerConnection();
      acceptCall(incomingCaller);
      // setIncomingCallerAfterAcceptedCall(incomingCaller);
      setIncomingCaller(null);
    }
  };

  // Khi bấm nút "End Call", gửi sự kiện EndCall lên server.
  const endCall = async () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setIncomingCaller(null);
    setSelectedUser(null);
    setActiveCall(false);
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    await hubConnection.invoke('EndCall');
    await hubConnection.invoke('GetRandomUser');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <h1>WebRTC CallHub</h1>

      {selectedUser && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '100px',
          }}>
          {incomingCaller ? (
            <div
              style={{
                padding: '10px',
                background: '#d0f0d0',
                marginBottom: '10px',
                width: '100%',
                borderRadius: '10px',
              }}>
              <strong>Cuộc gọi đến từ: {incomingCaller}</strong>
            </div>
          ) : (
            <div
              style={{
                padding: '10px',
                background: '#d0f0d0',
                marginBottom: '10px',
                width: '100%',

                borderRadius: '10px',
              }}>
              <strong>Người dùng được chọn để gọi: {selectedUser}</strong>
            </div>
          )}
          <img
            src='https://images.unsplash.com/photo-1520547704200-8bbf59077512?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'starts',
              gap: '10px',
              textAlign: 'left',
              width: '100%',
              borderRadius: '10px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left',
              width: '100%',
              marginBottom: '10px',
            }}>
            <p style={{ fontWeight: 'bold', fontSize: '25px', margin: 0 }}>
              Antony
            </p>
            <p style={{ fontSize: '16px', margin: 0, color: 'grey' }}>26</p>
          </div>
          <div
            style={{
              width: '100%',
              textAlign: 'left',
              fontSize: '10px',
              color: 'grey',
            }}>
            <p style={{ margin: 0, marginBottom: '5px' }}>
              New York University
            </p>
            <p style={{ margin: 0, marginBottom: '5px' }}>12 miles away</p>
          </div>
          <p
            style={{
              width: '100%',
              textAlign: 'left',
              fontSize: '15px',
              margin: 0,
            }}>
            Successful, driven, and always chasing meaningful connections. 💼✨
            I'm a man who thrives on ambition but believes true happiness lies
            in the moments shared with someone special. From deep conversations
            to spontaneous adventures, I value quality time and genuine
            connections. ❤️ Looking for a partner to create unforgettable
            memories with—if you’re into romance, good vibes, and real talks,
            let’s see where this goes.
          </p>
          {!incomingCaller && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                padding: '8px',
                borderRadius: '100%',
                marginTop: '25px',
                marginBottom: '15px',
                cursor: 'pointer',
              }}
              onClick={startCall}>
              <div>
                <PhoneIcon sx={{ color: 'white' }} />
              </div>
            </div>
          )}
          <div>
            {incomingCaller && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'orange',
                    padding: '8px',
                    borderRadius: '100%',
                    marginTop: '25px',
                    marginBottom: '15px',
                    cursor: 'pointer',
                  }}>
                  <div>
                    <CloseIcon sx={{ color: 'white' }} />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'violet',
                    padding: '8px',
                    borderRadius: '100%',
                    marginTop: '25px',
                    marginBottom: '15px',
                    cursor: 'pointer',
                  }}
                  onClick={acceptIncomingCall}>
                  <div>
                    <CheckIcon sx={{ color: 'white' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          style={{ width: '0' }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: '0' }}
        />
      </>
      {activeCall && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '100px',
            }}>
            {/* {!incomingCallerAfterAcceptedCall && (
              <div
                style={{
                  padding: '10px',
                  background: '#d0f0d0',
                  marginBottom: '10px',
                  width: '100%',

                  borderRadius: '10px',
                }}>
                <strong>
                  Người dùng được chọn để gọi: {selectedUserAfterAcceptedCall}
                </strong>
              </div>
            )}
            {incomingCallerAfterAcceptedCall && (
              <div
                style={{
                  padding: '10px',
                  background: '#d0f0d0',
                  marginBottom: '10px',
                  width: '100%',
                  borderRadius: '10px',
                }}>
                <strong>
                  Cuộc gọi đến từ: {incomingCallerAfterAcceptedCall}
                </strong>
              </div>
            )} */}
            <div
              style={{
                padding: '10px',
                background: '#e0d0f0',
                marginBottom: '10px',
                width: '100%',
                borderRadius: '10px',
              }}>
              <strong>Cuộc gọi đang hoạt động</strong>
            </div>
            <img
              src='https://images.unsplash.com/photo-1520547704200-8bbf59077512?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'starts',
                gap: '10px',
                textAlign: 'left',
                width: '100%',
                borderRadius: '10px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left',
                width: '100%',
                marginBottom: '10px',
              }}>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '25px',
                  marginBottom: 0,
                  marginTop: 0,
                }}>
                Antony
              </p>
              <p
                style={{
                  fontSize: '16px',
                  margin: 0,
                  marginBottom: 0,
                  marginTop: 0,
                  color: 'grey',
                }}>
                26
              </p>
            </div>
            <div
              style={{
                width: '100%',
                textAlign: 'left',
                fontSize: '10px',
                color: 'grey',
              }}>
              <p style={{ margin: 0, marginBottom: '5px' }}>
                New York University
              </p>
              <p style={{ margin: 0, marginBottom: '5px' }}>12 miles away</p>
            </div>
            <p
              style={{
                width: '100%',
                textAlign: 'left',
                fontSize: '15px',
                margin: 0,
              }}>
              Successful, driven, and always chasing meaningful connections.
              💼✨ I'm a man who thrives on ambition but believes true happiness
              lies in the moments shared with someone special. From deep
              conversations to spontaneous adventures, I value quality time and
              genuine connections. ❤️ Looking for a partner to create
              unforgettable memories with—if you’re into romance, good vibes,
              and real talks, let’s see where this goes.
            </p>
            {/* {!incomingCaller && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  padding: '8px',
                  borderRadius: '100%',
                  marginTop: '25px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                }}
                onClick={startCall}>
                <div>
                  <PhoneIcon sx={{ color: 'white' }} />
                </div>
              </div>
            )} */}
            {/* <div>
              {incomingCaller && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'orange',
                      padding: '8px',
                      borderRadius: '100%',
                      marginTop: '25px',
                      marginBottom: '15px',
                      cursor: 'pointer',
                    }}>
                    <div>
                      <CloseIcon sx={{ color: 'white' }} />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'violet',
                      padding: '8px',
                      borderRadius: '100%',
                      marginTop: '25px',
                      marginBottom: '15px',
                      cursor: 'pointer',
                    }}
                    onClick={acceptIncomingCall}>
                    <div>
                      <CheckIcon sx={{ color: 'white' }} />
                    </div>
                  </div>
                </div>
              )}
            </div> */}
            {activeCall && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  padding: '8px',
                  borderRadius: '100%',
                  marginTop: '25px',
                  marginBottom: '15px',
                  cursor: 'pointer',
                }}
                onClick={endCall}>
                <div>
                  <CloseIcon sx={{ color: 'white' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
