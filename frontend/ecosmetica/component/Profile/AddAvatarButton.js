import * as React from 'react';
import * as ImagePicker from 'expo-image-picker'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import { profileImageMock } from '../../assets/svg/profile-image.svg';

import config from '../../config'

export default class AddAvatarButton extends React.Component {
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
            photo_url: this.props.url_avatar,
            token: this.props.token
        }
    }

    async makePhoto() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1
                });

                if(!result.cancelled) {
                    this.setState({
                        uri: result.uri,
                        photoisLoaded: true
                    })
                    this.getUploadUrl(result.uri)
                }
            }
        }
    }

    async getUploadUrl(uri) {
        await fetch(`${config.VK_URL}/photos.getUploadServer/?album_id=${config.ALBUM_ID}&group_id=${config.GROUP_ID}&v=5.124&access_token=${ACCESS_USER_TOKEN}`, {
            method: 'GET'
        })
        .then((resp) => {
            return resp.json()
        })
        .then((ans) => {
            this.setState({ upload_url : ans.response.upload_url})
            this.uploadToVK(ans.response.upload_url, uri)
        })
    }

    async uploadToVK(upload_url, uri) {
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        
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
        let uri_image = '';
        const {server, aid, photos_list, hash} = this.state
        await fetch(`${config.VK_URL}/photos.save/?server=${server}&aid=${aid}&photos_list=${photos_list}&hash=${hash}&access_token=${config.ACCESS_USER_TOKEN}&album_id=${config.ALBUM_ID}&group_id=${config.GROUP_ID}&v=5.124`, {
            method: 'GET'
        })
        .then((resp) => {
            return resp.json()
        })
        .then((ans) => {
            uri_image = ans.response[0].sizes[2].url
            this.addToServer(uri_image)
            this.setState({photo_url: uri_image})
        })
    }

    async addToServer(uri) {
        if (this.state.token !== null) {
        await fetch(`${config.SERVER_URL}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`,
            },
            body: JSON.stringify({
                "profile_img_url": uri,
                "username": "qwerty"
            })
          })
            .then((resp) => {
              return resp.json()
            })
            .then((ans) => {
              console.log(ans)
            })
            .catch(e=>console.log(e))
        }
    }

    render() {
        let url;
        if (this.state.photo_url === "" || this.state.photo_url === null || this.state.photo_url === undefined) {
            url = this.props.url_avatar
        } else {
            url = this.state.photo_url
        }
        return (
            <View>
                <TouchableOpacity onPress={() => this.makePhoto()}>
                    {((this.state.photo_url === "" || this.state.photo_url === null || this.state.photo_url === undefined) && (this.props.url_avatar === null || this.props.url_avatar === "")) && <SvgXml width="100" height="100" xml={profileImageMock} />}
                    {((this.state.photo_url === "" || this.state.photo_url === null || this.state.photo_url === undefined ) && (this.props.url_avatar !== null && this.props.url_avatar !== "")) && <Image style={styles.image} source={{ uri: `${this.props.url_avatar}` }}/>}
                    {(this.state.photo_url !== "" && this.state.photo_url !== null && this.state.photo_url !== undefined) && <Image style={styles.image} source={{ uri: `${ this.state.photo_url }` }}/>}

                </TouchableOpacity>
            </View>
        );
    } 

}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    }
})
