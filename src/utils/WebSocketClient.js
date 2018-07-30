// websocket 跨域
// LW

class WebSocketClient {
    constructor(url, room = 'room') {
        this.msgQueue = []; // 发送数据存储
        this.connected = false; // 连接状态
        this.url = url; // 跨域url
        this.socket = null; // 初始化websocket
        this.accClose = false; //判断是否是手动关闭
        this.room = room;

        this.onMessage = null; // 实例接受数据
        this.onOpen = null; // 连接成功接受到的回调函数
        this.onClose = null; // 初始化关闭回调事件


        this.maxMess = 500; // 消息队列最大长度
        this._loop(); // 开启队列循环
    }

    //连接

    connect(onOpen) {
        console.log('-------开始连接');
        if (this.connected) {
            return; // 如果连接成功，退出连接
        }

        if (onOpen) { // 连接成功回调
            this.onOpen = onOpen;
        }

        this.accClose = false; // 是否自动关闭
        this.socket = new WebSocket(this.url); // 新建实例
        this.socket.onopen = (e) => { // 实例对象的onopen属性，用于指定连接成功后的回调函数。
            this.connected = true; // 连接是否成功
            if (this.onOpen) { // 连接成功回调
                this.onOpen();
            }

            console.log(this.url + '连接成功');
        };

        this.socket.onclose = (e) => { // 实例对象的onclose属性，用于指定连接关闭后的回调函数。
            this.connected = false; // 连接失败
            if (this.onClose) { // 监听关闭回调事件
                this.onClose();
            }

            console.log(this.url + '连接关闭');

            if (!this.accClose) { // 若非手动关闭，  自动重连
                this.connect();
            }
        };

        this.socket.onerror = (e) => { // 监听连接错误
            this.connected = false;
            console.log(this.url + '连接错误');
        };

        this.socket.onmessage = (e) => { // 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
            console.log(e, 'e--------e-------e');
            console.log(this.onMessage, 'this.onMessage');
            if (this.onMessage) { // 监听成功回调
                this.onMessage(e.data);
            }
        };
    }


    emit(eventType, data = {}, sendNow = false) { // 存储发送数据
        data.eventType = eventType;

        // if (eventType == 'join') {
        //     data.room = this.room;
        // }
        data = JSON.stringify(data);

        if (this.msgQueue.length > this.maxMess) {
            this.msgQueue.slice(0, 1);
        }

        if (sendNow) {
            this.msgQueue.unshift(data);
        } else {
            this.msgQueue.push(data);
        }
    }

    close(msg) { // 手动关闭
        this.accClose = true;
        this.socket.close(1000, msg);
    }

    //消息队列循环

    _loop() {
        window.cancelAnimationFrame(this.loopId); // 清楚定时器

        if (this.connected && this.msgQueue.length > 0) {
            let item = this.msgQueue.shift();
            this.socket.send(item); // 发送数据
        }

        this.loopId = window.requestAnimationFrame(this._loop.bind(this)); // 新建定时器
    }
}

export default WebSocketClient;


// 用法

// this.ws = new WebSocketClient(url, room);

// this.ws.connect(() => {
//     this.ws.emit('join', {
//         page: '',
//         search: '',
//         pageId: '',
//         control: false
//     });
// });

// this.ws.onMessage = (msg) => {

// }

// this.ws.close = () => {

// }