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


const URL = 'https://api.vk.com/method'
const ALBUM_ID = '275980882'
const GROUP_ID = '199800692'
const ACCESS_USER_TOKEN = '0022f51f57789b918c35ca1f6e3853b8ec6f6b79bdfca2b821dde1d21a84f0802620d8f504b508baf6e82'

const URL_SERVER = 'http://185.148.82.169:8005'

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

    componentDidUpdate(prevProps, prevState) {
        //console.log('product list updating', this.props.url_avatar)
        if (prevProps.photo_url !== this.props.url_avatar) {
          /*this.setState({
            photo_url: this.props.url_avatar,
          })*/
        }
        //console.log(this.state.data)
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
        //console.log("getUploadUrl")
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
            this.addToServer(uri_image)
            this.setState({photo_url: uri_image})
        })
        //this.props.setUrl(uri_image)
    }

    async addToServer(uri) {
        if (this.state.token !== null) {
        await fetch(`${URL_SERVER}/user/`, {
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
        //const {submited} = this.props
        //console.log("url", this.state.photo_url)
        //console.log("url from props", this.state.photo_url)
        let url;
        if (this.state.photo_url === "" || this.state.photo_url === null || this.state.photo_url === undefined) {
            url = this.props.url_avatar
        } else {
            url = this.state.photo_url
        }
        console.log("avatar render 2", url)
        console.log("avatar render 2 props", this.props.url_avatar)
        console.log("avatar render 2 state", this.state.photo_url)
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
