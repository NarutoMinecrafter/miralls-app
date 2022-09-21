import React from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Image, Dimensions, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Sizes, Colors, Styles, Navigation } from '../constants'
import DefaultScreen from './DefaultScreen';
import Preloader from './Preloader';
import _ from './i18n';

import { Store } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getPostPictureURL, getPosts } from './utils/post';

import Header from './Header.js';
import EmptyList from './EmptyList';


export default function ArchiveScreen({
    navigation
}) {
    const dispatch = useDispatch()

    // Хук для пользовательских данных
    const [me, _setMe] = React.useState(Store.getState().userReducer)
    const [posts, setPosts] = React.useState([])

    // Загружаем посты
    async function loadPosts() {
        const _posts = await getPosts(posts.length, 20, true)
        setPosts(_posts)
    }

    React.useEffect(() => {
        let isMounted = true;

        // Подписываемся на актуальные данные на этом экране
        function setMe() {
            if (isMounted) {
                _setMe(Store.getState().userReducer)
            }
        }
        Store.subscribe(setMe)

        if (!posts.length) {
            loadPosts()
        }

        const unsubscribe = navigation.addListener('focus', () => {
            // loadPosts()
            isMounted = false
        })

        return unsubscribe

    })

    if (!me || posts == null) return (<Preloader />)

    // Локализация
    const t = _(Navigation.Archive)

    return (
        <View style={s.Wrapper}>
            <Header
                title={t.Title}
                backButton={true}
                // backButtonOnPress={() => {
                //     navigation.navigate(Navigation.Tabs.Profile)
                // }}
                wrapperStyle={{paddingHorizontal: 24, marginBottom: 0}}
            />
                    <FlatList
          style={s.Posts.ScrollView}
          data={posts}
          numColumns={3}
          keyExtractor={(item) => item.id}
          onEndReached={loadPosts}
          ListEmptyComponent={() => <View style={s.Posts.EmptyList}>
          <EmptyList/>
      </View>}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
                navigation.navigate(Navigation.Post, {
                    me: me,

                    authorId: me.id,
                    authorUsername: me.username,
                    authorPicture: me.picture,

                    postId: p.id,
                    postMedia: getPostPictureURL(p.media),
                    postDescription: p.description,
                    likesCount: p.likes_count,
                    postDate: p.date,

                    archived: p.archived,
                    commentsEnabled: p.comments_enabled,

                    commentsCount: p.comments_count,
                    likedByCurrentUser: p.liked,
                })
            }}
        >

            <View style={s.Posts.Post.View}>
                <Image
                    style={s.Posts.Post.Image}
                    source={{ uri: getPostPictureURL(p.media) }}
                />
            </View>
        </TouchableOpacity>
          )}
        />
        </View>
    )
}

const screen = Dimensions.get('window')

const s = {
    Wrapper: {
        width: '100%',
        height: '100%',
        minHeight: '100%',
        backgroundColor: Colors.BG,
    },
    Posts: {
        ScrollView: {
            width: '100%',
            height: '100%',
            minHeight: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
        },
        View: {
            // marginTop: 8,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            // justifyContent: 'center',
            flexDirection: 'row',
        },
        EmptyList: {
            width: '100%',
            height: '100%',
        },
        Post: {
            View: {
                margin: 1,
            },
            Image: {
                width: Math.trunc(screen.width) / 3 - 2,
                height: Math.trunc(screen.width) / 3 - 2,
            },
        },
    }
}