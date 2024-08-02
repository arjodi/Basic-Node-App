

const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');
// const rl =readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// rl.question("Please enter your name : ",(name) => {
//     console.log("You wrote soething studpid like: " + name);
//     rl.close();

// })
// //.on listen to an event
// rl.on('close', () =>{ 
//     console.log("see you never");
//     process.exit(0);
// })

// 

// fs.readFile('./Files/output.txt','utf-8',(err,data) =>{
//     console.log(data);
//     fs.readFile('./Files/input.txt','utf-8',(err,data) =>{
//         console.log(data);

//     })

// })

// console.log("DOOOOOOOOOOOO ITTTTTTTTT");
const html = fs.readFileSync('./Template/index.html','utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));
let productListHtml = fs.readFileSync('./Template/product-list.html','utf-8')
let productDetailtHtml = fs.readFileSync('./Template/product-details.html','utf-8')


// let productHtmlArray = products.map((product)=>{
//     let output = productListHtml.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}',product.name);
//     output = output.replace('{{%MODELNAME%}}',product.modeName);
//     output = output.replace('{{%MODELNO%}}',product.modelNumber);
//     output = output.replace('{{%SIZE%}}',product.size);
//     output = output.replace('{{%CAMERA%}}',product.camera);
//     output = output.replace('{{%PRICE%}}',product.price);
//     output = output.replace('{{%COLOR%}}',product.color);
//     output = output.replace('{{%ID%}}',product.id);

//     return output
// })

function replaceHtml(template,product){
    let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}',product.name);
    output = output.replace('{{%MODELNAME%}}',product.modeName);
    output = output.replace('{{%MODELNO%}}',product.modelNumber);
    output = output.replace('{{%SIZE%}}',product.size);
    output = output.replace('{{%CAMERA%}}',product.camera);
    output = output.replace('{{%PRICE%}}',product.price);
    output = output.replace('{{%COLOR%}}',product.color);
    output = output.replace('{{%ID%}}',product.id);
    output = output.replace('{{%ROM%}}',product.ROM);
    output = output.replace('{{%DESC%}}',product.Description);
    
    return output;
}

const server = http.createServer((req,res) => {

    let {query, pathname: path} = url.parse(req.url, true);
    //console.log(x);
    
    //let path = req.url;

    if(path === '/' || path.toLowerCase() === '/home'){
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'my-header': 'Is OP '
        })
        res.end(html.replace("{{%CONTENT%}}",productListHtml ));
    }else if(path.toLowerCase() === '/about'){
        res.end(html.replace("{{%CONTENT%}}","About"))
    }else if(path.toLowerCase() === '/contact'){
        res.end(html.replace("{{%CONTENT%}}","Contact"))
    }else if(path.toLowerCase() === '/products'){
        if(!query.id){
            let productHtmlArray = products.map((prod) => {
                                return replaceHtml(productListHtml, prod);
                            })
                            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
                            res.writeHead(200, {'Content-Type': 'text/html' });
                            res.end(productResponseHtml);
            
           

        }else{
            let prod = products[query.id]
            let productDetailResponseHtml =  replaceHtml(productDetailtHtml, prod)
            res.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }
        // fs.readFile('./Data/products.json','utf-8',(err,data) => {
           
        //})
        
    
    }else {
        res.end(html);
    }
    
})


server.listen(8000,'192.168.68.6',()=>{
    console.log('Server has started')
})

