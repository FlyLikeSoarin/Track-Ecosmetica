import * as React from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as Font from 'expo-font';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    Text
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SvgXml } from 'react-native-svg';

import Icon_photo from 'react-native-vector-icons/MaterialIcons'


import add from '../../assets/svg/add.svg';
import ScanButton from '../Button/ScanButton'
import AddPhoto from './AddPhotoArea'

const ACCESS_TOKEN = '9b4729d0e104113795bcf445d07eaf7c3bf06e5dda86d7f25e89fa3bfdfd29648f8f53d163ce1f80664a0'
const URL = 'https://api.vk.com/method'
const ALBUM_ID = '275534485'
const GROUP_ID = '199800692'
const ACCESS_USER_TOKEN = '0022f51f57789b918c35ca1f6e3853b8ec6f6b79bdfca2b821dde1d21a84f0802620d8f504b508baf6e82'

var width = Dimensions.get('window').width;

Font.loadAsync({
    'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf'),
    'NotoSanaTamilBold': require('../../assets/fonts/NotoSansTamilUI-Bold.ttf')
});

export default class AddPhotoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            upload_url: '',
            server: null,
            photos_list: null,
            aid: null,
            hash: null,
            photoisLoaded: false,
            photo_url: null,
            loadingPhoto: false,
            modalVisible: false
        }
    }

    async makePhoto() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            else {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false,
                    aspect: [1, 3],
                    quality: 1
                });

                if (!result.cancelled) {
                    this.setState({
                        uri: result.uri,
                        photoisLoaded: true,
                        modalVisible: false
                    })
                    this.getUploadUrl(result.uri)
                }
            }
        }
    }

    async loadFromGallery() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.cancelled) {
                    this.setState({
                        uri: result.uri,
                        photoisLoaded: true,
                        modalVisible: false
                    })
                    this.getUploadUrl(result.uri)
                }
            }
        }
    }

    async getUploadUrl(uri) {
        console.log("getUploadUrl")
        await fetch(`${URL}/photos.getUploadServer/?album_id=${ALBUM_ID}&group_id=${GROUP_ID}&v=5.124&access_token=${ACCESS_USER_TOKEN}`, {
            method: 'GET'
        })
            .then((resp) => {
                return resp.json()
            })
            .then((ans) => {
                console.log(ans)
                this.setState({ upload_url: ans.response.upload_url })
                this.uploadToVK(ans.response.upload_url, uri)
            })
    }

    async uploadToVK(upload_url, uri) {
        //console.log("uploadToVK")
        //console.log(upload_url)
        //console.log(uri)
        let filename = uri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        /*const response = await fetch(uri);
        const blob = await response.blob();*/

        let formData = new FormData();
        formData.append('file1', { uri: uri, name: filename, type })

        await fetch(`${upload_url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((resp) => {
                return resp.json();
            })
            .then((ans) => {
                //console.log(ans);
                this.setState({
                    server: ans.server,
                    photos_list: ans.photos_list,
                    aid: ans.aid,
                    hash: ans.hash
                })
                this.savePhoto()
            })
    }

    async savePhoto() {
        //console.log("savrPhoto")
        let uri_image = '';
        const { server, aid, photos_list, hash } = this.state
        await fetch(`${URL}/photos.save/?server=${server}&aid=${aid}&photos_list=${photos_list}&hash=${hash}&access_token=${ACCESS_USER_TOKEN}&album_id=${ALBUM_ID}&group_id=${GROUP_ID}&v=5.124`, {
            method: 'GET'
        })
            .then((resp) => {
                return resp.json()
            })
            .then((ans) => {
                //console.log(ans)
                uri_image = ans.response[0].sizes[2].url
            })
        this.props.setUrl(uri_image)
        this.setState({ photo_url: uri_image })
    }

    render() {
        const { submited } = this.props
        //console.log(this.state.photoisLoaded)
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                    {(!this.state.photoisLoaded || submited) && <AddPhoto />}
                    {(this.state.photoisLoaded && !submited) && <Image style={styles.image} source={{ uri: `${this.state.uri}` }} />}
                </TouchableOpacity>
                <AwesomeAlert
                    show={this.state.loadingPhoto}
                    showProgress={true}
                    title=""
                    message=""
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("close")
                    }}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => {
                            //this.setState({modalVisible: false})
                            this.loadFromGallery()} 
                            } style={styles.modalButton}>
                            {/*<View style={styles.modalIcon}>
                                <Icon_photo name='insert-photo' color='gray' size={20} />
                </View>*/}
                            <View style={styles.modalTextArea}>
                                <Text style={styles.modalText}> Загрузить фото из галереи</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            //this.setState({modalVisible: false})
                            this.makePhoto()
                        }} style={styles.modalButton}>
                           {/* <View style={styles.modalIcon}>
                                <Icon_photo name='photo-camera' color='gray' size={20} />
            </View>*/}
                            <View style={styles.modalTextArea}>
                                <Text style={styles.modalText}>Сделать фото</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={()=>this.setState({modalVisible: false})}>
                            <View style={styles.modalTextArea}>
                                <Text style={styles.modalText2}>Отмена</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    image: {
        width: width - 0.7 * width,
        height: width - 0.7 * width,
        borderRadius: 30,
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    modalButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    modalIcon: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    modalTextArea: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontFamily: 'NotoSanaTamilLight',
        color: '#009E4E',
        
    },
    modalText2: {
        fontFamily: 'NotoSanaTamilBold',
        color: '#FF4D00',
    }
})