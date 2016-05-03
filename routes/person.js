exports.list = (function (req,res) {
    req.getConnection(function(err,connection){
        var query=connection.query("SELECT * FROM CUSTOMER",function(err,rows){
            if(err){
                console.log("Error:"+err);
            }
            else{
                res.render('',{data:rows});
            }
        });
    });
});

exports.save = (function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address
    };

    req.getConnection(function(err,connection){
        var query=connection.query("insert into customer set ?",data,function(err){
            if(err){
                console.log("Error:"+err);
            }
            else{
                res.redirect('/');
            }
        });
    });
});

exports.edit=(function(req,res){
    id=req.params.id;
    req.getConnection(function(err,connection){
        var query=connection.query("SELECT * FROM CUSTOMER WHERE person_id=?",[id],function(err, rows){
            if(err) console.log('Error :'+err);
            res.render('edit',{data:rows});
        });
    });

});

exports.update=(function(req,res){
    var input=JSON.parse(JSON.stringify(req.body));
    var data={
        name: input.name,
        email: input.email,
        phone :input.phone,
        address : input.address
    }
    var id=req.params.id;
    req.getConnection(function(err,connection){
        var query=connection.query("UPDATE CUSTOMER SET ? WHERE person_id= ?",[data,id],function(err,rows){
            if(err) console.log('Error :'+err);
            res.redirect('/');
        });
    });
});

exports.delete=(function(req,res){
    id=req.params.id;
    req.getConnection(function(err,connection){
        var query=connection.query("DELETE FROM CUSTOMER WHERE person_id=?",[id],function(err, rows){
            if(err) console.log('Error :'+err);
            res.redirect('/');
        });
    });

});
