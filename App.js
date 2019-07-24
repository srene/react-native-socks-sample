import React, { Component } from 'react';
import { Text, View } from 'react-native';
import publicIP from 'react-native-public-ip';
import { Button } from 'react-native';
import { TouchableHighlight  } from 'react-native';
import RNSocksLibraryModule from './RNSocksLibrary';


export default class reactApp extends Component {

  constructor() {
     super()
     this.state = {
        myText: 'loading...'
     }
  }

  componentDidMount(){
    return publicIP()
        .then(ip => {
          console.log(ip);
          this.updateText('Your IP is '+ip);
          // '47.122.71.234'
        })
        .catch(error => {
          console.log(error);
          this.updateText('Error loading IP address')
          // 'Unable to get IP address.'
        });
  }

  updateText = (ip) => {
     console.log("Set text "+ip)
     this.setState({myText: ip})
  }

  onPressReload = () => {
     console.log("Onpressed");
     RNSocksLibraryModule.show('Test', RNSocksLibraryModule.LONG);

     publicIP()
         .then(ip => {
           console.log(ip);
           this.updateText('Your IP is '+ip);

           // '47.122.71.234'
         })
         .catch(error => {
           console.log(error);
           this.updateText('Error loading IP address')
           // 'Unable to get IP address.'
         });
  }

  //RNSocksLibraryModule.show('Awesome', 1.0);


  render() {
    return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world! {this.state.myText}</Text>
        <TouchableHighlight onPress={()=>{RNSocksLibraryModule.show('Test', RNSocksLibraryModule.LONG);}}>
          <Text>Tap to show Toast!</Text>
        </TouchableHighlight>
        <Button
          onPress={this.onPressReload}
          title="Enable SOCKS Proxy"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>


    );
  }
}
