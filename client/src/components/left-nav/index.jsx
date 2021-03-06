import React from 'react';
import './index.less';
import Logo from '../../assets/images/logo.png';
import {Link, withRouter} from 'react-router-dom';
import {Menu,Icon} from 'antd';
// import menuList from '../../config/menuConfig';
import memoryUtils from "../../util/memoryUtils";

const {SubMenu}=Menu;

class LeftNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu: [],
            selectedKeys: [],
            openKeys: []
        }
    }
    UNSAFE_componentWillMount = () => {
        let menu = [
            {
                key: "/home",
                title: "首页",
                icon: "home",
                display: 1
            },
            {
                key: "/order",
                title: "订单管理",
                icon: "account-book",
                display: 0,
                children: [
                    {
                        key: "/order",
                        title: "全部订单",
                        display: 0
                    },
                    {
                        key: "/order/stage",
                        title: "前台管理",
                        display: 0
                    }
                ]
            },
            {
                key: "/product",
                title: "商品管理",
                icon: "shopping",
                display: 0,
                children: [
                    {
                        key: "/product/category",
                        title: "商品分类",
                        display: 0
                    },
                    {
                        key: "/product",
                        title: "商品列表",
                        display: 0
                    },
                    {
                        key: "/product/add",
                        title: "添加商品",
                        display: 0
                    }
                ]
            },
            {
                key: "/stock",
                title: "库存管理",
                icon: "appstore",
                display: 0,
                children: [
                    {
                        key: "/stock",
                        title: "库存信息",
                        display: 0
                    },
                    {
                        key: "/stock/inventory",
                        title: "库存盘点",
                        display: 0
                    }
                ]
            },
            {
                key: "/member",
                title: "会员管理",
                icon: "crown",
                display: 0,
                children: [
                    {
                        key: "/member",
                        title: "会员列表",
                        display: 0
                    },
                    {
                        key: "/member/add",
                        title: "新增会员",
                        display: 0
                    }
                ]
            },
            {
                key: "/employee",
                title: "人事管理",
                icon: "team",
                display: 0,
                children: [
                    {
                        key: "/employee",
                        title: "员工列表",
                        display: 0
                    },
                    {
                        key: "/employee/user",
                        title: "用户列表",
                        display: 0
                    },
                    {
                        key: "/employee/role",
                        title: "角色管理",
                        display: 0
                    }
                ]
            }
        ];
        memoryUtils.user.permission.forEach(item => {
            switch (item) {
                case '全部订单':
                    menu[1].display = 1;
                    menu[1].children[0].display = 1;
                    break;
                case '前台管理':
                    menu[1].display = 1;
                    menu[1].children[1].display = 1;
                    break;
                case '商品分类':
                    menu[2].display = 1;
                    menu[2].children[0].display = 1;
                    break;
                case '商品列表':
                    menu[2].display = 1;
                    menu[2].children[1].display = 1;
                    break;
                case '添加商品':
                    menu[2].display = 1;
                    menu[2].children[2].display = 1;
                    break;
                case '库存信息':
                    menu[3].display = 1;
                    menu[3].children[0].display = 1;
                    break;
                case '库存盘点':
                    menu[3].display = 1;
                    menu[3].children[1].display = 1;
                    break;
                case '会员列表':
                    menu[4].display = 1;
                    menu[4].children[0].display = 1;
                    break;
                case '新增会员':
                    menu[4].display = 1;
                    menu[4].children[1].display = 1;
                    break;
                case '员工列表':
                    menu[5].display = 1;
                    menu[5].children[0].display = 1;
                    break;
                case '用户列表':
                    menu[5].display = 1;
                    menu[5].children[1].display = 1;
                    break;
                case '角色管理':
                    menu[5].display = 1;
                    menu[5].children[2].display = 1;
                    break;
                default:
                    break;
            }
        });
        this.setState({
            menu: menu,
            selectedKeys: this.getSelectedKeys(this.props.location.pathname),
            openKeys: this.getOpenKeys(this.props.location.pathname)
        })
    };
    rootSubmenuKeys = ['/home', '/order', '/product','/category','/stock', '/member','/employee'];
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    closeSubmenuAll = () =>{
        this.setState({openKeys:[]});
    };
    getSelectedKeys = (pathname) => {
        // let selectedKey = '';
        // switch(pathname){
        //     case '/order/stage': selectedKey = '/order/stage'; break;
        //     case '/product/category': selectedKey = '/product/category'; break;
        //     case '/product/add': selectedKey = '/product/add'; break;
        //     case '/stock/inventory': selectedKey = '/stock/inventory'; break;
        //     case '/member/add': selectedKey = '/member/add'; break;
        //     case '/employee/user': selectedKey = '/employee/user'; break;
        //     case '/employee/role': selectedKey = '/employee/role'; break;
        //     default: selectedKey = '/'+pathname.split('/')[1];
        // }
        // return [selectedKey];
        
        let selectedKey = '';
        switch (pathname) {
            // 首页
            case '/home':
            case '/home/view':
            case '/home/edit': selectedKey = '/home'; break;
            // 订单管理
            case '/order':
            case '/order/view': selectedKey = '/order'; break;
            case '/order/stage':
            case '/order/stage/view': selectedKey = '/order/stage'; break;
            // 商品管理
            case '/product':
            case '/product/view':
            case '/product/edit': selectedKey = '/product'; break;
            case '/product/add': selectedKey = '/product/add'; break;
            case '/product/category':
            case '/product/category/view':
            case '/product/category/add':
            case '/product/category/edit': selectedKey = '/product/category'; break;
            //库存管理
            case '/stock':
            case '/stock/view':
            case '/stock/add':
            case '/stock/edit':
            case '/stock/log': selectedKey = '/stock'; break;
            case '/stock/inventory':
            case '/stock/inventory/view':
            case '/stock/inventory/add': selectedKey = '/stock/inventory'; break;
            //会员管理
            case '/member':
            case '/member/view':
            case '/member/edit': selectedKey = '/member'; break;
            case '/member/add': selectedKey = '/member/add'; break;
            //人事管理
            case '/employee':
            case '/employee/view':
            case '/employee/add':
            case '/employee/edit': selectedKey = '/employee'; break;
            case '/employee/user':
            case '/employee/user/add':
            case '/employee/user/edit': selectedKey = '/employee/user'; break;
            case '/employee/role':
            case '/employee/role/add':
            case '/employee/role/edit': selectedKey = '/employee/role'; break;
            default: break;
        }
        return [selectedKey]
    };
    getOpenKeys = (pathname) => {
        let openKey = '';
        switch(pathname){
            case '/product/category': openKey = '/product'; break;
            case '/stock/inventory': openKey = '/stock'; break;
            case '/employee/role': openKey = '/employee'; break;
            case '/employee/user': openKey = '/employee'; break;
            default: openKey = '/'+pathname.split('/')[1];
        }
        return [openKey];
    };
    render(){
        return (
            <div className="left-nav">
                <Link to="/">
                    <div className="left-nav-header">
                        <img src={Logo} alt="logo"/>
                        <h1>餐厅后台</h1>
                    </div>
                </Link>
                <Menu
                    selectedKeys={this.getSelectedKeys(this.props.location.pathname)}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    // style={{backgroundColor:"#0354d9"}}
                    theme="dark"
                >
                    {
                        this.state.menu.map((item) => {
                            if(!item.children){
                                return (
                                    <Menu.Item
                                        key={item.key}
                                        style={{display: item.display===0 ? "none" : "block"}}
                                    >
                                        <Link to={item.key}><Icon type={item.icon}/>{item.title}</Link>
                                    </Menu.Item>
                                )
                            }else{
                                return  (
                                    <SubMenu
                                        key={item.key}
                                        title={(<span><Icon type={item.icon}/>{item.title}</span>)}
                                        style={{display: item.display===0 ? "none" : "block"}}
                                    >
                                        {
                                            item.children.map(item => {
                                                return (
                                                    <Menu.Item
                                                        key={item.key}
                                                        style={{display: item.display===0 ? "none" : "block"}}
                                                    >
                                                        <Link to={item.key}>{item.title}</Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            }
                        })
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);