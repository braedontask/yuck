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
import {Alert, Text, StyleSheet, View} from 'react-native';

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
  SwipeClassification,
  SwipeHandlersType,
} from './components/Joystick/JoystickHelper';

interface Props {}

interface State {
  isRecording: boolean;
  isPlaying: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

class App extends React.Component<Props, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: Props) {
    super(props);
    this.state = {
      isRecording: false,
      isPlaying: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  private startRecording = async () => {
    console.log('start recording!');

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });

    const uri = await this.audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
      true,
    );

    console.log(uri);
  };

  private stopRecording = async () => {
    console.log('stop recording!');

    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();

    console.log(result);
  };

  private onPauseRecord = async () => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log(err);
    }
  };

  private onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  private toggleRecording = async () => {
    this.state.isRecording ? this.stopRecording() : this.startRecording();
    this.setState(previous => {
      return {isRecording: !previous.isRecording};
    });
  };

  private startPlaying = async () => {
    console.log('start playing!');

    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });

      if (e.currentPosition === e.duration) {
        this.togglePlaying();
      }
    });

    const msg = await this.audioRecorderPlayer.startPlayer();
    const volume = await this.audioRecorderPlayer.setVolume(1.0);

    console.log(msg, volume);
  };

  private stopPlaying = async () => {
    console.log('stop playing!');

    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  private onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  private togglePlaying = async () => {
    this.state.isPlaying ? this.stopPlaying() : this.startPlaying();
    this.setState(previous => {
      return {isPlaying: !previous.isPlaying};
    });
  };

  private defaultSwipeHandlerBuilder = (direction: string) => {
    switch (direction) {
      case 'up':
        return () => this.togglePlaying();
      case 'down':
        return () => this.toggleRecording();
      default:
        return () => {
          Alert.alert(`${direction} swipe!`);
        };
    }
  };

  private swipeHandlers: SwipeHandlersType = {
    [SwipeClassification.LeftSwipe]: this.defaultSwipeHandlerBuilder('left'),
    [SwipeClassification.RightSwipe]: this.defaultSwipeHandlerBuilder('right'),
    [SwipeClassification.DownSwipe]: this.defaultSwipeHandlerBuilder('down'),
    [SwipeClassification.UpSwipe]: this.defaultSwipeHandlerBuilder('up'),
    [SwipeClassification.UnclassifiedSwipe]:
      this.defaultSwipeHandlerBuilder('unclassified'),
  };

  render() {
    return (
      <View style={styles.container}>
        {/* TODO: remove this! just wanted to visually communicate changes */}
        <Text style={styles.text}>
          {'isRecording:  ' + this.state.isRecording + '\n'}
          {'recordTime:  ' + this.state.recordTime + '\n'}
          {'isPlaying:      ' + this.state.isPlaying + '\n'}
          {'playTime:      ' + this.state.playTime + '\n'}
        </Text>
        <Joystick onButtonPress={() => {}} swipeHandlers={this.swipeHandlers} />
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
  text: {
    fontFamily: 'Cochin',
  },
});

export default App;
