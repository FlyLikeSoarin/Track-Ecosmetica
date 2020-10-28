import * as React from 'react';
import * as ImagePicker from 'expo-image-picker'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import AddPhoto from './AddPhotoArea'

const ACCESS_TOKEN = '9b4729d0e104113795bcf445d07eaf7c3bf06e5dda86d7f25e89fa3bfdfd29648f8f53d163ce1f80664a0'
const URL = 'https://api.vk.com/method'
const ALBUM_ID = '275534485'
const GROUP_ID = '199800692'
const ACCESS_USER_TOKEN = '0022f51f57789b918c35ca1f6e3853b8ec6f6b79bdfca2b821dde1d21a84f0802620d8f504b508baf6e82'


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
            loadingPhoto: false
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
                    allowsEditing: true,
                    aspect: [1, 3],
                    quality: 1
                });

                if(!result.cancelled) {
                    this.setState({
                        uri: result.uri,
                    })
                    this.getUploadUrl(result.uri)
                    this.setState({
                        loadingPhoto: true
                    })
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
            this.setState({ upload_url : ans.response.upload_url})
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
        const {server, aid, photos_list, hash} = this.state
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
        this.setState({photo_url: uri_image})
        this.setState({photoisLoaded: true})
        this.setState({
            loadingPhoto: false
        })
    }

    render() {
        const {submited} = this.props
        console.log(this.state.photoisLoaded)
        return (
            <View>
                <TouchableOpacity onPress={() => this.makePhoto()}>
                    {(!this.state.photoisLoaded || submited) && <AddPhoto />}
                    {(this.state.photoisLoaded && !submited) && <Image style={styles.image} source={{ uri: `${this.state.photo_url}` }}/>}
                </TouchableOpacity>
                <AwesomeAlert
                            show={this.state.loadingPhoto}
                            showProgress={true}
                            title=""
                            message=""
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={false}
                            onCancelPressed={() => {
                                this.setState({
                                    loadingPhoto: false
                                })
                            }}
                        />
            </View>
        );
    } 

}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 30,
    }
})