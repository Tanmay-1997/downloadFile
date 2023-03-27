import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../components/customButton';
import {downloadFile} from '../utils/commonFunction';

const data = {
  pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
  pdfName: 'pdfFile',
  imgUrl: 'https://sample-videos.com/img/Sample-png-image-100kb.png',
  imgName: 'imgFile',
  docUrl:
    'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc',
  docName: 'docFile',
  docxUrl:
    'https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx',
  docxName: 'docxFile',
};

export default function DownoadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Downoad File Example</Text>
      <Button
        title="Dowbload pdf file"
        textStyle={{fontSize: 14, fontWeight: '700'}}
        containerStyle={[styles.buttonstyle, {backgroundColor: '#744DDE'}]}
        onPress={() => downloadFile(data?.pdfUrl, data?.pdfName)}
      />
      <Button
        title="Dowbload png file"
        containerStyle={[styles.buttonstyle, {backgroundColor: '#B6A7DE'}]}
        onPress={() => downloadFile(data?.imgUrl, data?.imgName)}
      />
      <Button
        title="Dowbload doc file"
        containerStyle={[styles.buttonstyle, {backgroundColor: '#ACF09B'}]}
        onPress={() => downloadFile(data?.docUrl, data?.docName)}
      />
      <Button
        title="Dowbload docx file"
        containerStyle={[styles.buttonstyle, {backgroundColor: '#9BF0D5'}]}
        onPress={() => downloadFile(data?.docxUrl, data?.docxName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFACD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonstyle: {
    backgroundColor: 'yellow',
    marginVertical: 10,
    width: 250,
    borderRadius: 15,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 2,
    shadowRadius: 1,
  },
  heading:{
    fontSize:25,
    fontWeight:'bold',
    justifyContent:'center',
    marginBottom:50
  }
});
