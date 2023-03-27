// Library Imports
import {Platform, PermissionsAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';

type Props = {
  data: object[];
};

export const downloadFile = async (url: string, type = '') => {
  const d = new Date();

  //@function getFileExtension of the url
  function getFileExtension(txt: any) {
    if (txt?.length > 0) {
      return txt?.split(/\.(?=[^\.]+$)/)?.pop();
    }
  }

  //@function showSnackbar for showing msg to user that your file is downloaded {in ios u can click on it and see the downloaded file}
  const showSnackBar = (
    text: string,
    textColor?: string,
    buttontext?: string,
    onPressHandle?: () => void,
  ) => {
    setTimeout(() => {
      Snackbar.show({
        text: text,
        textColor: textColor ?? 'blue',
        duration: 3000,
        action: {
          onPress: onPressHandle ?? undefined,
          textColor: 'green',
          text: buttontext ?? '',
        },
      });
    }, 100);
  };
  //------------------new implementaion of download doxument as (asso.doc)--------------
  const permissions = await checkPermission();
  let extractedFormat = getFileExtension(url);
  if (permissions) {
    const date = new Date();
    const image_URL = url;
    let ext = getFileExtension(image_URL);
    ext = `.${ext[0]}`;
    const validExt = ['pdf', 'jpg', 'jpeg', 'png', 'csv', 'xlsx', 'xls'];
    ext = validExt.includes(ext) ? ext : type;
    const {config, fs, ios} = RNFetchBlob;
    const PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    const configOption = Platform.select({
      ios: {
        fileCache: true,
        path:
          `${PictureDir}/${type}` +
          Math.random().toString().slice(2, 6) +
          '.' +
          extractedFormat,
        appendExt: type,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: `${PictureDir}/${type}${Math.floor(
            date.getTime() + date.getSeconds() / 2,
          )}.${ext}`,
          description: 'downloading file from slice',
        },
      },
    });
    config(configOption)
      .fetch('GET', url, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob?.fs?.writeFile(`file://${res.data}`, res?.data, 'base64');
          showSnackBar('file downloaded', 'white', 'Open It', () => {
            RNFetchBlob?.ios?.previewDocument(`file://${res.data}`);
          });
        }
        if (Platform.OS == 'android') {
          showSnackBar('File downloaded');
        }
      })
      .catch(e => {
        console.log(e.message);
      });
  }
};
//------------------------------------------------//

//@function checkPermission for android specific//
const checkPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download Photos',
          buttonPositive: 'OK',
          buttonNegative: 'CANCEL',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
};
