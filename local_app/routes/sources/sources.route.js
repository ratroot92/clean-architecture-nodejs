


const app=require('express');
const router=app.Router();
const fb_PersonTargetModal=require('./../../models/facebook_person_target.model');
const fb_GroupTargetModal=require('./../../models/facebook_group_target.model');
const db=require('./../../../db/db');



// add facebook person page 
router.get('/add/facebook',(req,res,next)=>{
//     console.log("source route called ");
//     let user=req.session.user;
//     let listUsers;
//     if(user){
//         req.session.message = {
//             type: "",
//             intro: "",
//             message: ""
//           };
          
//           res.render('sources/facebook');
//     }
//     else{
// res.redirect('/');
 //     }
// var data=[];
// fb_PersonTargetModal.find({},(function(err, result) {
//     if (err) {
//         console.log("error : "+err);
//         res.render('sources/facebook');
//     }
//     else{
//         for(var i=0;i<result.length;i++){
//            data.push(result[i]);
//             }
//             console.log(data);
     
//         console.log("success : all facebook persons targets found ");
//         res.render('sources/facebook',{list:data});
//     }



// }));
res.render('sources/facebook');
});

//end facebook person page 



//get list of all facebook person targets via ajax for datatables 

router.post('/add/facebook/populateFacebookPersonTargets',(req,res,next)=>{    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i");
            searchStr = { $or: [{'author_type': regex},{'author_id': regex },{'author_name': regex },
            {'author_account': regex },{'author_url': regex },{'expired_on': regex },
            {'need_screenshots': regex },{'': regex },{'': regex }] };
    }
    else
    {
         searchStr={};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    fb_PersonTargetModal.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        fb_PersonTargetModal.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
                fb_PersonTargetModal.find(searchStr, ' author_type author_name author_id author_name author_account author_url expired_on  need_screenshots created_at updated_at',{'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    res.send(data);
                });
        
          });
});
});
// end route to get list of facebook person targets for datatables 




//add facebook person target 
router.post('/add/facebook/add_facebook_person_target/',(req,res,next)=>{
    console.log(req.body);
    let New_fb_PersonTargetModal= new fb_PersonTargetModal({
        _id:new db.Types.ObjectId(),
        author_type:req.body.author_type,
        author_id:req.body.author_id,
        author_name:req.body.author_name,
        author_account:req.body.author_account,
        author_url:req.body.author_url,
        interval:req.body.interval,
        expired_on:req.body.expired_on,
        need_screenshots:req.body.need_screenshots,
      
    }).save((err,person_target)=>{
        if(!err){
        fb_PersonTargetModal.find({},(err,all_facebook_persons_targets)=>{
            if(!err && all_facebook_persons_targets){
                console.log("All facebook person target fetched successfully");
                console.log("Facebook person target inserted successfully ");
                console.log(person_target);
                res.render('sources/facebook',{target:person_target,message:{type:'success',intro:'Osint Notifier ',message:'facebook person target successfully added  '},all_facebook_person_targets:all_facebook_persons_targets})
            }
            else{
                console.log("Error ! while attemping to fetch all facebook_person_targets ");
                console.log("Facebook person target inserted successfully ");
                console.log(person_target);
                res.render('sources/facebook',{target:person_target,message:{type:'warning',intro:'Osint Notifier ',message:'facebook person target successfully added || all facebook person targets facebook_persons failed  '}})
            }

        })

        }  
        else{
            console.log("Error ! while attemping to insert facebook target ");
            console.log(err);
            console.log("Error ! while attemping to fetch all facebook_person_targets ");
            console.log(person_target);
            res.render('sources/facebook',{target:person_target,message:{type:'danger',intro:'Osint Notifier ',message:'facebook person target failed   '}})
        } 
    });
});
//end add facebook person target 





//facebook group routes 



//add facebook Group target 
router.post('/add/facebook/add_facebook_group_target/',(req,res,next)=>{
    console.log(req.body);
    let New_fb_GroupTargetModal= new fb_GroupTargetModal({
        _id:new db.Types.ObjectId(),
        author_type:req.body.group_author_type,
        author_id:req.body.group_author_id,
        author_name:req.body.group_author_name,
        author_account:req.body.group_author_account,
        author_url:req.body.group_author_url,
        interval:req.body.group_interval,
        expired_on:req.body.group_expired_on,
        need_screenshots:req.body.group_need_screenshots,
      
    }).save((err,group_target)=>{
        if(!err){
        fb_GroupTargetModal.find({},(err,all_facebook_groups_targets)=>{
            if(!err && all_facebook_groups_targets){
                console.log("All facebook group target fetched successfully");
                console.log("Facebook group target inserted successfully ");
                console.log(group_target);
                res.render('sources/facebook',{target:group_target,message:{type:'success',intro:'Osint Notifier ',message:'facebook group target successfully added  '},all_facebook_group_targets:all_facebook_groups_targets})
            }
            else{
                console.log("Error ! while attemping to fetch all facebook_group_targets ");
                console.log("Facebook group target inserted successfully ");
                console.log(group_target);
                res.render('sources/facebook',{target:group_target,message:{type:'warning',intro:'Osint Notifier ',message:'facebook group target successfully added || all facebook group targets list failed  '}})
            }

        })

        }  
        else{
            console.log("Error ! while attemping to insert facebook target ");
            console.log(err);
            console.log("Error ! while attemping to fetch all facebook_group_targets ");
            console.log(group_target);
            res.render('sources/facebook',{target:group_target,message:{type:'danger',intro:'Osint Notifier ',message:'failed to add a new facebook group target    '}})
        } 
    });
});
//end add facebook person target 


//get list of all facebook person targets via ajax for datatables 

router.post('/add/facebook/populateFacebookGroupTargets',(req,res,next)=>{    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i");
            searchStr = { $or: [{'author_type': regex},{'author_id': regex },{'author_name': regex },
            {'author_account': regex },{'author_url': regex },{'group_expired_on': regex },
            {'need_screenshots': regex },{'': regex },{'': regex }] };
    }
    else
    {
         searchStr={};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    fb_GroupTargetModal.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        fb_GroupTargetModal.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
                fb_GroupTargetModal.find(searchStr, ' author_type author_name author_id author_name author_account author_url expired_on  need_screenshots created_at updated_at',{'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    res.send(data);
                });
        
          });
});
});
// end route to get list of facebook person targets for datatables 





//facebook page routes 




router.post('/add/facebook/add_facebook_page_target/',(req,res,next)=>{
    console.log(req.body);
    let New_fb_GroupTargetModal= new fb_GroupTargetModal({
        _id:new db.Types.ObjectId(),
        author_type:req.body.page_author_type,
        author_id:req.body.page_author_id,
        author_name:req.body.page_author_name,
        author_account:req.body.page_author_account,
        author_url:req.body.page_author_url,
        interval:req.body.page_interval,
        expired_on:req.body.page_expired_on,
        need_screenshots:req.body.page_need_screenshots,
      
    }).save((err,group_target)=>{
        if(!err){
        fb_GroupTargetModal.find({},(err,all_facebook_groups_targets)=>{
            if(!err && all_facebook_groups_targets){
                console.log("All facebook group target fetched successfully");
                console.log("Facebook group target inserted successfully ");
                console.log(group_target);
                res.render('sources/facebook',{target:group_target,message:{type:'success',intro:'Osint Notifier ',message:'facebook group target successfully added  '},all_facebook_group_targets:all_facebook_groups_targets})
            }
            else{
                console.log("Error ! while attemping to fetch all facebook_group_targets ");
                console.log("Facebook group target inserted successfully ");
                console.log(group_target);
                res.render('sources/facebook',{target:group_target,message:{type:'warning',intro:'Osint Notifier ',message:'facebook group target successfully added || all facebook group targets list failed  '}})
            }

        })

        }  
        else{
            console.log("Error ! while attemping to insert facebook target ");
            console.log(err);
            console.log("Error ! while attemping to fetch all facebook_group_targets ");
            console.log(group_target);
            res.render('sources/facebook',{target:group_target,message:{type:'danger',intro:'Osint Notifier ',message:'failed to add a new facebook group target    '}})
        } 
    });
});
//end add facebook person target 
















router.get('/add/instagram',(req,res,next)=>{
   
    res.render('sources/instagram');
    })


    
router.get('/add/linkedin',(req,res,next)=>{
   
    res.render('sources/linkedin');
    });

    
    router.get('/add/twitter',(req,res,next)=>{
      
        res.render('sources/twitter');
        });
    



module.exports=router;