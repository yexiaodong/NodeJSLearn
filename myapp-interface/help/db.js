var mssql = require('mssql');
var conf = require('db-config.js');

var restoreDefaults = function(){
    conf;
};

//连接数据库
var getConnection = function(callback){
    if(!callback){
        callback = function(){};
    }
    var con = new mssql.ConnectionPool(conf,function(err){
        if(err){
            throw err;
        }
        callback(con);
    });
}

//查询
var querySql = function(sql,params,callBack){
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        if(param != ""){
            for(var index in params){
                if(typeof params[index] == "number"){
                    ps.input(index,mssql.Int);//input的作用
                }
                else if(typeof params[index] == "string"){
                    ps.input(index,mssql.NVarChar);
                }
            }
        }

        ps.prepare(sql,function(err){
            if(err){
                console.log(err);
            }
            ps.execute(params,function(err,recordset){
                callBack(err,recordset);
                ps.unprepare(function(err){
                    if(err){
                        console.log(err);
                    }
                })
            });
        });
    });
    restoreDefaults();
}