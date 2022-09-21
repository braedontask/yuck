/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Joystick from './components/Joystick/Joystick';
import {Alert, StyleSheet, View} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface Props {}

interface State {
  isRecording: boolean;
}

class App extends React.Component<Props, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: Props) {
    super(props);
    this.state = {isRecording: false};
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  private startRecording = () => {
    console.log('starting!');
  };

  private stopRecording = () => {
    console.log('stopping!');
  };

  private toggleRecording = () => {
    this.state.isRecording ? this.stopRecording() : this.startRecording();
    this.setState(previous => {
      return {isRecording: !previous.isRecording};
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Joystick onButtonPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B6F9C9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
