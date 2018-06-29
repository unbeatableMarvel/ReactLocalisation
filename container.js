import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FormattedMessage, injectIntl } from 'react-intl';
import TextField from 'material-ui/TextField';
import { get } from 'https';


class ReactLocalisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textField:["Enter text","locale from","locale to"],
            localeFrom:'',
            localeTo:'',
            textInput:'',
            submitFlag:false,
            result:{}
        }
       
       
    }

    componentDidMount() {
      var getResult=localStorage.getItem('locale');
      
      this.setState({result:JSON.parse(getResult),submitFlag:true})
    }
    collectTextFieldVal(text,e,newValue)
    {
      
        if(text.toLowerCase()=='enter text')
        {
              this.setState({textInput:newValue})
        }
        else if(text.toLowerCase()=='locale from')
        {
            this.setState({localeFrom:newValue})
            localStorage.removeItem('locale')
        }
        else
        {
            this.setState({localeTo:newValue})
            localStorage.removeItem('locale')
        }
    }
    colledtFormValue=()=>
    {
        var Obj={};
         Obj.locale=this.state.localeFrom+'-'+this.state.localeTo;
         Obj.text=this.state.textInput;
        localStorage.setItem('locale',JSON.stringify(Obj))
      
        
        location.reload(false)
    }


    render() {
   console.log("rende",this.state)
  
        return (
            
            <MuiThemeProvider>
             <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '27px', marginTop: '25px', marginBottom: '40px' }}>ReactJs Localisation :</div>
                    <div style={{display:'inline-grid',textAlign:'-webkit-center'}}>
                    {this.state.textField.map((text,index)=>
                    <TextField  key={index} floatingLabelText={text} onChange={(e,newValue)=>this.collectTextFieldVal(text,e,newValue)}/>
                    )}
                    <RaisedButton primary={true} label="Submit" onClick={this.colledtFormValue}/>
                    </div>         
                     <div style={{ fontWeight: 'bold', fontSize: '27px', marginTop: '25px', marginBottom: '40px' }}>Localised Result :</div>
                    <div>   
                        {this.state.submitFlag && this.state.result!=null && 
                        <div>  
                            <FormattedMessage
                            id={this.state.result.text}
                            defaultMessage={this.state.result.text}
                            />
                            </div>
                        }
                        </div>
                </div>
            </MuiThemeProvider>
          
        );
    }
}
export default injectIntl(ReactLocalisation);

