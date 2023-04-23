class ApiErorr extends Error{
    constructor(message,statuscode) {
        super(message);
        this.statusCode=statuscode;
        this.status=`${statuscode}`.startsWith(4)?"fail":"error";
        this.isOprationl=true;
    }
}

module.exports=ApiErorr