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
    <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=familyhub123%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FDenver" width="900" height="1000" />
  </div>
`;

class Calendar extends React.Component {
  render() {
    return (
      <HTMLView
        value={htmlContent}
        renderNode={renderNode} />
    );
  }
}


export default Calendar
