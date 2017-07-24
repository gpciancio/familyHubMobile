import React from 'react';
import { Text, StyleSheet, View, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';


function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == 'iframe') {
    const a = node.attribs;
    const iframeHtml = `<iframe src="${a.src}"></iframe>`;
    return (
      <View
        key={index}
        style={{width: Number(a.width), height: Number(a.height)}}>
        <WebView
          source={{html: iframeHtml}} />
      </View>
    );
  }
}

const htmlContent = `
  <div>
    <iframe src="https://www.powr.io/plugins/weather/view?unique_label=6ab3252a_1500745897&external_type=iframe" width="900" height="1000" />
  </div>
`;

class Weather extends React.Component {
  render() {
    return (
      <HTMLView
        value={htmlContent}
        renderNode={renderNode} />
    );
  }
}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export default Weather
