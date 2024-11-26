import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import useUrlStore from '@/store/urlStore';

const WebViewScreen = () => {
  const { url } = useUrlStore();
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <Text style={styles.text}>Loading...</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  loaderOverlay: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 10, 
  },
  webview: {
    flex: 1, 
  },
});
