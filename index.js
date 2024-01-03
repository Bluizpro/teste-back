import express from 'express';
var runIntent = require("./serviceDialogflow.cjs").runIntent;

router.post("/requestText", function(req, res){
    (async() => {
        console.log(req.body);
        
        var result = await runIntent(req.body.projectId, req.body.text);
        return res.send(
            {
                "Response": result.Response,
                "Query": result.Query,
                "Intent": result.Intent
            }
        )
    })();
})

module.exports = router;