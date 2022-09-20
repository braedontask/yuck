/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, type PropsWithChildren} from 'react';
import Joystick from './components/Joystick';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';

interface Props {
};

interface State {
  isRecording: boolean,
};

class App extends React.Component<Props, State> {

  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: Props) {
    super(props);
    this.state = { isRecording: false };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  private startRecording = () => {
    console.log('starting!');
  }

  private stopRecording = () => {
    console.log('stopping!');
  }

  private toggleRecording = () => {
    this.state.isRecording ? this.stopRecording() : this.startRecording();
    this.setState(previous => {
      return { isRecording: !previous.isRecording };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Joystick/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B6F9C9',
    flex: 1,
  },
});

export default App;
