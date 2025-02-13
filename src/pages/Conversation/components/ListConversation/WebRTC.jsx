import { useEffect, useRef, useState } from "react";
import hubConnection, {
  startConnection,
  acceptCall,
} from "../../../../services/HubConnection";
import { HubConnection } from "@microsoft/signalr";

export default function WebRTC() {
  // State để lưu thông tin cuộc gọi đến (người gọi đến)
  const [incomingCaller, setIncomingCaller] = useState(null);
  // State để lưu thông tin người dùng được random (người nhận cuộc gọi)
  const [selectedUser, setSelectedUser] = useState(null);
  // State để đánh dấu cuộc gọi đã được chấp nhận (đang hoạt động)
  const [activeCall, setActiveCall] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initConnection = async () => {
      await startConnection();
      try {
        await hubConnection.invoke("GetRandomUser");
      } catch (err) {
        console.error("❌ Lỗi khi gọi GetRandomUser:", err);
      }
    };

    initConnection();

    const handleIncomingCall = (callerId) => {
      console.log("📞 Incoming call from:", callerId);
      setIncomingCaller(callerId);
    };
    hubConnection.on("IncomingCall", handleIncomingCall);

    const handleRandomUserSelected = (targetConnectionId) => {
      console.log("🔍 Random user selected:", targetConnectionId);
      setSelectedUser(targetConnectionId);
    };
    hubConnection.on("RandomUserSelected", handleRandomUserSelected);

    const handleNoAvailableUsers = () => {
      console.log("❌ No available users");
      setSelectedUser(null);
    };
    hubConnection.on("NoAvailableUsers", handleNoAvailableUsers);

    // Khi cuộc gọi được chấp nhận, nhận sự kiện "CallAccepted" từ server
    const handleCallAccepted = (partnerId) => {
      console.log("✅ Call accepted with:", partnerId);
      setActiveCall(true);
      // Optionally, clear selectedUser nếu không cần hiển thị nữa
      setSelectedUser(null);
    };
    hubConnection.on("CallAccepted", handleCallAccepted);

    // Lắng nghe sự kiện CallEnded từ server
    const handleCallEnded = () => {
      console.log("📴 Cuộc gọi đã kết thúc");
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
    hubConnection.on("CallEnded", handleCallEnded);

    return () => {
      hubConnection.off("IncomingCall", handleIncomingCall);
      hubConnection.off("RandomUserSelected", handleRandomUserSelected);
      hubConnection.off("NoAvailableUsers", handleNoAvailableUsers);
      hubConnection.off("CallEnded", handleCallEnded);
    };
  }, []);

  const createPeerConnection = async () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && (selectedUser || incomingCaller)) {
        const targetId = selectedUser || incomingCaller;
        hubConnection.invoke("SendCandidate", targetId, JSON.stringify(event.candidate));
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };

  // Khi bấm nút "Start Call" => gọi người dùng được random (selectedUser)
  const startCall = async () => {
    if (!selectedUser) {
      console.log("Chưa có người dùng được chọn để gọi.");
      return;
    }
    await createPeerConnection();
    hubConnection.invoke("StartCall", selectedUser);
  };

  // Khi nhận được cuộc gọi, bấm nút "Accept Call" để chấp nhận
  const acceptIncomingCall = async () => {
    if (incomingCaller) {
      await createPeerConnection();
      acceptCall(incomingCaller);
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
    await hubConnection.invoke("EndCall");
    await hubConnection.invoke("GetRandomUser")
  };

  return (
    <div>
      <h2>WebRTC CallHub</h2>

      {incomingCaller && (
        <div style={{ padding: "10px", background: "#f0f0f0", marginBottom: "10px" }}>
          <strong>Cuộc gọi đến từ: {incomingCaller}</strong>
        </div>
      )}

      {selectedUser && (
        <div style={{ padding: "10px", background: "#d0f0d0", marginBottom: "10px" }}>
          <strong>Người dùng được chọn để gọi: {selectedUser}</strong>
        </div>
      )}

      {activeCall && (
        <div style={{ padding: "10px", background: "#e0d0f0", marginBottom: "10px" }}>
          <strong>Cuộc gọi đang hoạt động</strong>
        </div>
      )}

      <video ref={localVideoRef} autoPlay playsInline style={{ width: "45%" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "45%" }} />

      <button onClick={startCall}>Start Call</button>
      {incomingCaller && <button onClick={acceptIncomingCall}>Accept Call</button>}
      {activeCall  && <button onClick={endCall}>End Call</button>}
    </div>
  );
}
