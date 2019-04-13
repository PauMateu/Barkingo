import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder,TouchableOpacity,Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { AsyncStorage } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
const Users = [
  { id: "1", uri: require('../assets/1.jpg'),key:"1" },
  { id: "2", uri: require('../assets/2.jpg'),key:"2" },
  { id: "3", uri: require('../assets/3.jpg'),key:"3" },
  { id: "4", uri: require('../assets/4.jpg'),key:"4" },
  { id: "5", uri: require('../assets/5.jpg'),key:"5" }
]
var arrayOffers = [];

export default class swipeScreen extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      offers: [],
      isLoading: true
    }



    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }

  async handleSwipeLeft(){

   // this.setState({id: offers[this.state.currentIndex]});
   // const response = await this.SwipeLeftToAPI();

  }

  async handleSwipeRight(){
   // this.setState({id: offers[this.state.currentIndex]});
   // const response = await this.SwipeRightToAPI();


  }


  async SwipeLeftToAPI(){

    return fetch('http://10.4.41.164/api/offers/swipeleft', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem(ACCESS_TOKEN),

      },
      body: JSON.stringify({

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.msg);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

  }

  async SwipeRightToAPI(){

    return fetch('http://10.4.41.164/api/offers/swipeRight', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('access_token'),

      },
      body: JSON.stringify({

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.msg);
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) { //SWIPE RIGHT
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })

            })
          this.handleSwipeRight();

          })
        }
        else if (gestureState.dx < -120) { //SWIPE LEFT
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })

         this.handleSwipeLeft;

        }
        if (gestureState.dy > -5  && gestureState.dy < 5 && gestureState.dx > -5 &&  gestureState.dx < 5) {
          this.props.navigation.navigate('perfilAnimal');

        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }
    async handleGetOffers(){

      const t = await AsyncStorage.getItem('access_token');
      tokenJson = JSON.parse(t);
      const response = await this.getOffers(tokenJson);
      this.setState({isLoading:false});
/*
      console.log("success: " + response.success);
      console.log("msg: " + response.msg);
      console.log("response: " + response.offers);
      */

      if(response.success){
        this.setState({offers: response.offers});
        Alert.alert("DONE!");
      }
      else{
        Alert.alert("Error", response.msg);
      }
    }

  async getOffers(t) {


    return fetch('http://10.4.41.164/api/offers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-access-token': t.token
      }
      }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });

  }


  renderUsers = () => {

    return this.state.offers.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (

          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 180, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: 1, position: 'absolute', bottom: 20, right: 40, zIndex: 1000 }}>
              <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: '800', padding: 10 }}> {item.name}</Text>
            </Animated.View>

              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={item.urlImage} />

          </Animated.View>


        )
      }
      else {
        return (
          <Animated.View
          {...this.PanResponder.panHandlers}

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 180, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: 1, position: 'absolute', bottom: 20, right: 40, zIndex: 1000 }}>
              <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: '800', padding: 10 }}></Text>
            </Animated.View>
            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />

          </Animated.View>

        )
      }
    }).reverse()
  }

  render() {

    if (this.state.isLoading) {
      this.handleGetOffers();
        return   <LinearGradient colors = {['#F15A24', '#D4145A']}
          start = {[0, 1]}
          end = {[1, 0]}
          style={{
            flex:1,
            padding: '10%',
            paddingTop: '30%'
          }}>

          </LinearGradient>;
      }
    return (
      <LinearGradient colors = {['#F15A24', '#D4145A']}
      start = {[0, 1]}
      end = {[1, 0]}
      style={{
        flex:1,
      }}>
        <View style={{ height: 60 }}>
        </View>

        <View style={{ flex: 1 }}>

          {this.renderUsers()}

        </View>

        <View style={{ height: 120 }}>
        </View>
      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
