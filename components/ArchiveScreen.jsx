import React from 'react'
import { View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Navigation } from '../constants'
import Preloader from './Preloader';
import _ from './i18n';

import { Store } from '../redux/store';
import { getPostPictureURL, getPosts } from './utils/post';

import Header from './Header.js';
import EmptyList from './EmptyList';


export default function ArchiveScreen({
    navigation
}) {

    // Хук для пользовательских данных
    const [me, _setMe] = React.useState(Store.getState().userReducer)
    const [posts, setPosts] = React.useState([])

    // Загружаем посты
    async function loadPosts() {
        const _posts = await getPosts(posts.length, 20, true)
        setPosts((prevPosts) => [...prevPosts, ..._posts])
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

                    postId: item.id,
                    postMedia: getPostPictureURL(item.media),
                    postDescription: item.description,
                    likesCount: item.likes_count,
                    postDate: item.date,

                    archived: item.archived,
                    commentsEnabled: item.comments_enabled,

                    commentsCount: item.comments_count,
                    likedByCurrentUser: item.liked,
                })
            }}
        >

            <View style={s.Posts.Post.View}>
                <Image
                    style={s.Posts.Post.Image}
                    source={{ uri: getPostPictureURL(item.media) }}
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