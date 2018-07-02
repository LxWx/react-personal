let mockName = {
    string: 'string|30-40',
    number: 'number|1-100',
    boolean: 'boolean|1',
    object: 'object|2-4',
    array: 'array|1-10'
};

let mockVal = {
    string: '★',
    number: 100,
    boolean: true,
    object: {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省'
    },
    array: [
        'AMD',
        'CMD',
        'UMD'
    ]
};


module.exports = {
    mockName: mockName,
    mockVal : mockVal
};