import { useEffect, useRef, useState } from "react";
import hubConnection, {
  startConnection,
  acceptCall,
} from "../../../../services/HubConnection";

export default function WebRTC() {
  // State để lưu thông tin cuộc gọi đến (người gọi đến)
  const [incomingCaller, setIncomingCaller] = useState(null);
  // State để lưu thông tin người dùng được random (người nhận cuộc gọi)
  const [selectedUser, setSelectedUser] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    // Khởi tạo kết nối SignalR
    const initConnection = async () => {
      await startConnection();
      console.log();
      if (hubConnection.state === "Connected") {
        try {
          await hubConnection.invoke("GetRandomUser");
        } catch (err) {
          console.error("❌ Lỗi khi gọi GetRandomUser:", err);
        }
      } else {
        console.warn("⚠️ Kết nối SignalR chưa sẵn sàng.");
      }
    };

    initConnection();

    // Khi có cuộc gọi đến, server gửi sự kiện "IncomingCall"
    const handleIncomingCall = (callerId) => {
      console.log("📞 Incoming call from:", callerId);
      setIncomingCaller(callerId);
    };
    hubConnection.on("IncomingCall", handleIncomingCall);

    // Khi server chọn được người dùng để gọi, sẽ gửi sự kiện "RandomUserSelected"
    const handleRandomUserSelected = (targetConnectionId) => {
      console.log("🔍 Random user selected:", targetConnectionId);
      setSelectedUser(targetConnectionId);
    };
    hubConnection.on("RandomUserSelected", handleRandomUserSelected);

    // Khi không có user nào sẵn, server gửi sự kiện "NoAvailableUsers"
    const handleNoAvailableUsers = () => {
      console.log("❌ No available users");
      setSelectedUser(null);
    };
    hubConnection.on("NoAvailableUsers", handleNoAvailableUsers);

    return () => {
      hubConnection.off("IncomingCall", handleIncomingCall);
      hubConnection.off("RandomUserSelected", handleRandomUserSelected);
      hubConnection.off("NoAvailableUsers", handleNoAvailableUsers);
    };
  }, []);

  const createPeerConnection = async () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Gửi ICE candidate cho đối tác (dùng selectedUser khi gọi hoặc incomingCaller khi nhận)
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && (selectedUser || incomingCaller)) {
        const targetId = selectedUser || incomingCaller;
        hubConnection.invoke("SendCandidate", targetId, JSON.stringify(event.candidate));
      }
    };

    // Khi nhận track từ remote, hiển thị lên video
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Lấy media stream của local (video & audio)
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
    // Gọi đến người dùng được random
    hubConnection.invoke("StartCall", selectedUser);
  };

  // Khi nhận được cuộc gọi, bấm nút "Accept Call" để chấp nhận
  const acceptIncomingCall = async () => {
    if (incomingCaller) {
      await createPeerConnection();
      acceptCall(incomingCaller);
      // Sau khi chấp nhận, reset trạng thái incomingCaller
      setIncomingCaller(null);
    }
  };

  return (
    <div>
      <h2>WebRTC CallHub</h2>

      {/* Hiển thị thông báo khi có cuộc gọi đến */}
      {incomingCaller && (
        <div style={{ padding: "10px", background: "#f0f0f0", marginBottom: "10px" }}>
          <strong>Cuộc gọi đến từ: {incomingCaller}</strong>
        </div>
      )}

      {/* Hiển thị thông báo người dùng được random (để gọi) */}
      {selectedUser && (
        <div style={{ padding: "10px", background: "#d0f0d0", marginBottom: "10px" }}>
          <strong>Người dùng được chọn để gọi: {selectedUser}</strong>
        </div>
      )}

      <video ref={localVideoRef} autoPlay playsInline style={{ width: "45%" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "45%" }} />

      <button onClick={startCall}>Start Call</button>
      {/* Chỉ hiển thị nút Accept Call khi có cuộc gọi đến */}
      {incomingCaller && <button onClick={acceptIncomingCall}>Accept Call</button>}
    </div>
  );
}