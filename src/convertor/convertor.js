import React from 'react';

export class Convertor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded:false,
            currencyCode:[],
            postIdc:[],
            no_currency:"0",
            select1_data:"BTC",
            fullname_crypto:"Bitcoin BTC",
            select2_data:"USD",
            fullname_currency:"United States Dollar $ USD",
            current_price:null,
            exchange:true,
            exchange_crypto_price:"0.00003133"
        };
        
    }
   

    componentDidMount(){
        fetch('https://pro-api.coinmarketcap.com/v1/fiat/map?CMC_PRO_API_KEY=c9efbfb9-a9b1-4c5a-9b38-017900c90e27')
        .then(res => res.json())
        .then(json => {
                
           this.setState({ 
            currencyCode:json.data,
            
        })
        
         });
         fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=c9efbfb9-a9b1-4c5a-9b38-017900c90e27')
         .then(res => res.json())
         .then(json => {
                 
            this.setState({ 
             postIdc:json.data,
             
         })
         
          });
          this.ComponentUpdate();
    }
ComponentUpdate(){
    var currency_code=this.state.select2_data;
    var crypto_code=this.state.select1_data;
    console.log(currency_code+" -- "+crypto_code);
    // fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=INR&CMC_PRO_API_KEY=f289f0da-d6ff-40df-bf39-49e20b3d4bda')
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol='+crypto_code+'&convert='+currency_code+'&CMC_PRO_API_KEY=c9efbfb9-a9b1-4c5a-9b38-017900c90e27')
    .then(res => res.json())
    .then(json => {
        let {quote} = json.data[crypto_code];
        let {price}=quote[currency_code];
        this.setState({ 
            current_price:price
        })
    
     });
     fetch('https://min-api.cryptocompare.com/data/price?fsym='+currency_code+'&tsyms='+crypto_code)
     .then(res => res.json())
     .then(json => {

        //  let {price}=quote[currency_code];
         this.setState({ 
             exchange_crypto_price:json[crypto_code]
         })
     
      });
      
}
currencyConverter = () =>{
    this.ComponentUpdate();
  this.setState({
      exchange:!this.state.exchange
  })

}
handleChange(event){
    event.target.value.length>0?
    this.setState({
no_currency:event.target.value
    }):
    this.setState({
        no_currency:"0"
            })
}
select1Change(event){
    var s1= event.target.value;
    var last_space=event.target.value.toString().lastIndexOf(" ");
    var final_s1 = s1.substring(last_space+1);
    this.setState({
        fullname_crypto:s1,
select1_data:final_s1
    })
    this.ComponentUpdate();
}
select2Change(event){
    var s2= event.target.value;
    var last_space=event.target.value.toString().lastIndexOf(" ");
    var final_s2 = s2.substring(last_space+1);
    this.setState({
        fullname_currency:s2,
select2_data:final_s2
    })
    this.ComponentUpdate();
}



    render() {
        console.log(this.state.no_currency,this.state.select1_data,this.state.select2_data);
        const {currencyCode,postIdc} = this.state;
        return (
            <div className="mt-5">
                <h4 className="text-center">Cryptocurrency Converter Calculator</h4>
                <div class="row centered-form center-block">
                <div className="well container p-4">
                <div className="row">
                <div className="col-md-12 col-xs-12 my-2">
                    <input className="no_currency_input" type="text" placeholder="Enter amount to convert"  onChange={this.handleChange.bind(this)}/>
                </div>
                </div>
{this.state.exchange==true?
    <div>
                <div className="row">
                            <div className="col-md-5 col-xs-12 my-2">
                            <div className="input-group">
                               
  <select className="custom-select" id="cryptoname" onChange={this.select1Change.bind(this)}>
    {postIdc.map(postidc =>{
        return this.state.fullname_crypto==postidc.name+" "+postidc.symbol?
        <option value={postidc.name+" "+postidc.symbol} selected>{postidc.name +" "+postidc.symbol}</option>
        :
        <option value={postidc.name+" "+postidc.symbol}>{postidc.name +" "+postidc.symbol}</option>
   
    }
    )}
  </select>
</div>
                                </div>
                            <div className="col-md-2 col-xs-12 mt-2 text-center">
                            <div className="input-icons"> 
            <i className="btn btn-lg btn-primary fa fa-exchange" onClick={this.currencyConverter}></i> 
            {/* <input className="input-field btn btn-lg btn-primary" type="button" onClick={this.changeColor}/>  */}
            </div>
                            </div>
                            <div className="col-md-5 col-xs-12  my-5 my-md-2 text-left">
                            <div className="input-group">
  <select className="custom-select" id="currencyname" onChange={this.select2Change.bind(this)}>
    {currencyCode.map(globalcurrency =>{
        return this.state.fullname_currency==globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol?
    <option value={globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol} selected>{globalcurrency.name+" "+globalcurrency.sign+"  "+globalcurrency.symbol}</option>
    :
    <option value={globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol}>{globalcurrency.name+" "+globalcurrency.sign+"  "+globalcurrency.symbol}</option>
    }
        )}
    
  </select>
</div>
                                </div>
                                
                                </div>
                                 <div className="d-flex mt-2 justify-content-center">
                                <div className="no.of_currency ml-2">{this.state.no_currency}</div>
                                <div className="cryptoname ml-2">{this.state.fullname_crypto}</div>
                                <div className="equal ml-2">=</div>
                                <div className="currency_value ml-2">{this.state.current_price * this.state.no_currency}</div>
                                <div className="currency_code ml-2"> {this.state.fullname_currency}</div>
                                </div>
                                                                    </div>
                                :
                                <div>
                                <div className="row">
                                <div className="col-md-5 col-xs-12 my-2">
                                <div className="input-group">
                                <select className="custom-select" id="currencyname" onChange={this.select2Change.bind(this)}>
                                {currencyCode.map(globalcurrency =>{
        return this.state.fullname_currency==globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol?
    <option value={globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol} selected>{globalcurrency.name+" "+globalcurrency.sign+"  "+globalcurrency.symbol}</option>
    :
    <option value={globalcurrency.name+" "+globalcurrency.sign+" "+globalcurrency.symbol}>{globalcurrency.name+" "+globalcurrency.sign+"  "+globalcurrency.symbol}</option>
    }
        )}
      </select>
    </div>
                                    </div>
                                <div className="col-md-2 col-xs-12 mt-2  text-center">
                                <div className="input-icons"> 
                <i className="btn btn-lg btn-primary fa fa-exchange" onClick={this.currencyConverter}></i> 
                {/* <input className="input-field btn btn-lg btn-primary" type="button" onClick={this.changeColor}/>  */}
                </div>
                                </div>
                                <div className="col-md-5 col-xs-12 my-5 my-md-2 text-left">
                                <div className="input-group">
                                <select className="custom-select" id="cryptoname" onChange={this.select1Change.bind(this)}>
                                {postIdc.map(postidc =>{
        return this.state.fullname_crypto==postidc.name+" "+postidc.symbol?
        <option value={postidc.name+" "+postidc.symbol} selected>{postidc.name +" "+postidc.symbol}</option>
        :
        <option value={postidc.name+" "+postidc.symbol}>{postidc.name +" "+postidc.symbol}</option>
   
    }
    )}
      </select>
    </div>
                                    </div>
                                    </div>
                                 
 <div className="d-flex mt-2 justify-content-center">
<div className="no.of_currency ml-2">{this.state.no_currency}</div>
<div className="cryptoname ml-2">{this.state.fullname_currency}</div>
<div className="equal ml-2">=</div>
<div className="currency_value ml-2">{this.state.exchange_crypto_price * this.state.no_currency}</div>
<div className="currency_code ml-2"> {this.state.fullname_crypto}</div>
</div>

                                    </div>
                                }
                       </div>
                        </div>
                        </div>
        )
    }
}