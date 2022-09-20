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
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface Props {
};

interface State {
  isRecording: boolean,
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {
    isRecording: false,
  };

  toggleRecording = () => {
    this.state.isRecording = !this.state.isRecording;
  };

  render() {
    return (
      <SafeAreaView>
        <Button
          onPress={this.toggleRecording}
          title={this.state.isRecording ? 'stop' : 'record'}
          color='#841584'
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
});

export default App;
