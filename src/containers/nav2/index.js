import view from './views/Index';

module.exports = {
    routeList: [{
        path: '/nav2',
        comp: view
    }],
    menuList: [{
        name: 'nav2',
        key: 'nav2/key',
        iconFont: '',
        isMenu: true,
        children: [{
            name: 'children1',
            key: 'nav2/key/children1',
            iconFont: '',
            isMenu: true,
            children: [{
                name: 'minSub',
                key: '/nav2',
                iconFont: '',
                isMenu: true,
            }]
        }]
    }]
};