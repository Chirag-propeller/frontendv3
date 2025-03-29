'use client';

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import { DisconnectButton } from "@livekit/components-react";
import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
// import SimpleVoiceAssistance from './SimpleVoiceAssistance';
import SimpleVoiceAssistance from './SimpleVoiceAssistance2';

interface VoiceAssistantProps {
  setShowVoiceAssistant: (show: boolean) => void;
}

const VoiceAssistant = ({ setShowVoiceAssistant }: VoiceAssistantProps) =>  {
  // TODO: get user input for room and name
  const room = 'quickstart-room';
  const name = 'quickstart-user';

  
  const [token, setToken] = useState("");

  const url = "https://livekitwebapp-abddetfvdfg2gaar.eastus2-01.azurewebsites.net"

  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log("run");
        const response = await fetch(`${url}/getToken`);
        const token: string = await response.text(); 
        // Explicitly typing the response as string
        alert("Update Successful")
        setToken(token);
      } catch (error) {
        alert("Something went wrong..")
        console.error("Error fetching token:", error);
      }
    };
  
    fetchToken(); // Call the async function inside useEffect
  }, []); 

  return (
    <div className='h-[90%] border-1 border-solid border-gray-500 rounded-sm m-1 p-2 bg-white w-full'>
    <LiveKitRoom
      // serverUrl="wss://new-for-frontend-testing-1p7wht22.livekit.cloud"
      serverUrl="wss://connect-disconnect-button-jpqwiqjn.livekit.cloud"
      token = {token}
      // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDMxODUxMTEsImlzcyI6IkFQSThzeW5iSFhKdk51ViIsIm5iZiI6MTc0MjI4NTExMSwic3ViIjoiMTAiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiQ2hpcmFnIiwicm9vbUpvaW4iOnRydWV9fQ.mlEhPJTe6TBlHrSud93YkdBhfuNfD49vSFPZhXsnNTA"
      video={false}
      connect={true}
      audio={true}
      onDisconnected={() => setShowVoiceAssistant(false)}
      data-lk-theme="default"
      className='flex h-12 justify-center'
      style={{ 
        backgroundColor: 'white',
        '--lk-background-color': 'white'
      } as React.CSSProperties}
    >
      {/* <DisconnectButton className='h-20'>Leave room</DisconnectButton> */}

      <RoomAudioRenderer />
      <SimpleVoiceAssistance/>
    </LiveKitRoom>
    </div>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
// const VoiceAssistant = () => {
//   return (
//     <div>
//         video Assistant

//     </div>
//   )
// }

export default VoiceAssistant