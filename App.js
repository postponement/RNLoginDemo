
import React, { Component,PropTypes } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    button,
    AppRegistry,
    NativeModules,
    TouchableOpacity,
    NavigatorIOS,
    ScrollView,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

// 引入这个类库 修改app.js
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var nativeJump = require('react-native').NativeModules.YCViewController;

export default class NAV extends Component {
    render() {
        return (
            <NavigatorIOS
                style={{flex:1}}
                initialRoute={{
                    navigationBarHidden:true,
                    component: loginView,
                    passProps: {},
                }}
            />
        );
    }
}

class loginView extends Component {
    login(text){

        if (this.state.username == 'abcd' && this.state.password == '1234'){
            this.props.navigator.push({
                component: List,
                title: '列表',
                passProps: {},
            });
        }else {
            alert('老铁,你的账号或者密码不正确');
        }
    }

    unLogin(text){
        alert(text);
    }

    newUser(text){
        alert(text);
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            username:'',
            password:'',
        };
    }

    render() {
        return (
            <View style={styles.container} >

                {/*头像*/}
                <Image source={require('./Images/icon.png')} style={styles.headImageStyle} />

                {/*账户密码输入框*/}
                <TextInput
                    placeholder={'请输入账号'}
                    style={styles.testInputStyle}
                    onChangeText={(text) => this.setState({username:text})}
                    value={this.state.username}
                />

                <TextInput placeholder={'请输入密码'}
                           secureTextEntry={true}
                           style={styles.testInputStyle}
                           onChangeText={(text) => this.setState({password:text})}
                           value={this.state.password}
                />

                {/*登录*/}
                <View style={styles.loginInStyle}>
                    <TouchableOpacity style={styles.loginInStyle} onPress={this.login.bind(this,'hello')}>
                        <Text style={{color:'white'}}>登录</Text>
                    </TouchableOpacity>
                </View>

                {/*忘记密码 注册*/}
                <View style={styles.settingStyle}>
                    <TouchableOpacity onPress={this.unLogin.bind(this,'我还没写呢')}>
                        <Text>无法登陆</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.newUser.bind(this,'欢迎老铁加入')}>
                        <Text>新用户</Text>
                    </TouchableOpacity>
                </View>

                {/*三方登录*/}
                <View style={styles.otherStyles}>
                    <Text>其他登录方式</Text>

                    <Image source={require('./Images/icon3.png')}
                           style={styles.otherImageStyles}
                    />

                    <Image source={require('./Images/icon7.png')}
                           style={styles.otherImageStyles}
                    />

                    <Image source={require('./Images/icon8.png')}
                           style={styles.otherImageStyles}

                    />

                </View>
            </View>
        );
    }
}

class List extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:'',
        };
      }
    render() {
        return (
            <ScrollView style={styles.flex}>

                <View style={styles.list_item}>
                    <TouchableOpacity style={styles.list_item} onPress={this.goTo.bind(this)}>
                        <Image source={require('./Images/icon.png')} style={styles.iocnLayout}/>
                        <View >
                            <Text style={styles.titleLayout}>
                                我是标题
                            </Text>
                            <Text style={styles.list_item_font}>
                                这个图片是本地加载
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.list_item}>
                    <TouchableOpacity style={styles.list_item} onPress={this.goTo.bind(this)}>
                        <Image source={{uri:'http://localhost/image/%E5%B0%8F%E6%B3%BD.jpg'}} style={styles.iocnLayout}/>
                        <View >
                            <Text style={styles.titleLayout}>
                                我是标题
                            </Text>
                            <Text style={styles.list_item_font}>
                               这个图片是网络加载
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.list_item}>
                    <TouchableOpacity style={styles.list_item} onPress={this.goTo.bind(this)}>
                        <Image source={{uri:'http://localhost/image/jzn.jpg'}} style={styles.iocnLayout}/>
                        <View >
                            <Text style={styles.titleLayout}>
                                我是标题
                            </Text>
                            <Text style={styles.list_item_font}>
                              这个图片是网络加载
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.list_item}>
                    <Text style={styles.titleFont}>
                        {this.state.text}
                    </Text>
                </View>
            </ScrollView>
        );
    }
    goTo(){
        // this.props.navigator.push({
        //     component: Detail,
        //     title: '详情',
        //     rightButtonTitle: '收藏',
        //     onRightButtonPress: function(){
        //         alert('点击了收藏按钮。');
        //     }
        // });
        nativeJump.RNInvokeOCCallBack({'name':'RN透传name'},(error,result)=>{
            if (error){
                Alert.alert('出错了');
            }else{
                 this.setState({text:result});
            }

        })
    }
}

// class Detail extends Component {
//     render() {
//         return (
//             <ScrollView>
//                 <Text>这个是详情页~~~</Text>
//             </ScrollView>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {

        // 水平垂直居中
        flex: 1,
        backgroundColor: '#F5FCFF',

        // 主轴居中
        // justifyContent: 'center',

        // 测轴居中
        alignItems: 'center'
    },

    viewStyle: {
        // height:
        // 确定主轴的朝向
        flexDirection:'row',
        // 换行
        flexWrap:'wrap'
    },

    imageStyle: {
        width:80,
        height:80
    },

    inputStyle: {
        width:300,
        height:60,
        borderWidth:1,
        borderColor:'#dddddd'
    },

    headImageStyle:{
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:100,
        marginBottom:30,
        borderRadius:40,
        borderWidth:2,
        borderColor:'orange',
    },

    testInputStyle:{
        backgroundColor:'white',
        height:40,
        width:width*0.8,
        marginLeft:30,
        marginRight:30,

        // 设置间距
        marginBottom:2,
        textAlign:'center'
    },

    loginInStyle:{
        height:40,

        // 宽度乘以0.8即可
        width:width*0.8,
        backgroundColor:'blue',

        // 文字居中 主轴 侧轴居中
        alignItems:'center',
        justifyContent:'center',
        marginTop:50,
        marginBottom:30,
        borderRadius:10
    },

    settingStyle:{
        flexDirection:'row',
        width:300,

        // 两端对齐
        justifyContent:'space-between',
    },

    otherStyles:{
        // 横向排布
        flexDirection:'row',
        // 侧轴上下居中对齐
        alignItems:'center',
        position:'absolute',
        bottom:50,
        left:30,
    },

    otherImageStyles:{
        width:50,
        height:50,

        borderRadius:25,
        marginLeft:10,
    },

    flex:{
        flex: 1,
    },
    list_item:{
        height:80,
        borderBottomWidth:1,
        borderBottomColor: '#ddd',
        flexDirection:'row',
        justifyContent: 'flex-start'
    },

    iocnLayout: {
        width:50,
        height:50,
        alignSelf:'center',
        marginLeft:20,
        marginRight:20,

    },

    titleLayout: {
        marginTop:15,
        marginBottom:20
    },

    list_item_font:{
        fontSize:16,
    },

    titleFont:{
        fontSize:20,
        marginLeft:10,
        alignSelf:'center'
    }
});