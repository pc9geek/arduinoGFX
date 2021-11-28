'use strict';

const rootElement = React.createElement;
const displaywidth=160;
const displayheight=128;
class App extends React.Component {
    constructor(props) {
        super(props);
        var pix = [];
        for (let i = 0; i < displaywidth; i++) {
            pix.push([]);
        }
        pix.forEach(item => {
            for (let x = 0; x <  displayheight; x++) {
                item.push('black');
            }
        })
        this.state={
            commandQueue: "",
            pixels: pix,
        }
    }
    render() {
        return (
            <div class='container'>            
                <DisplayScreen pixels={this.state.pixels} commandQueue={this.state.commandQueue}></DisplayScreen>
                <div class='output'></div>    
                <ControlPanel commandQueue={this.state.commandQueue}/>        
            </div>
        );
    }
}

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (            
            <div class='controlpanel'>
                <div id="mousePosn"></div>
                <div class="command">
                    <p>fillScreen(
                        <input type='text' placeholder='BLACK' ></input>
                        );                        
                    </p>
                </div>
            </div>
        );
    }
}


class DisplayScreen extends React.Component {
    constructor(props) {
        super(props);   
    }
    GFXfillScreen(color){
        console.log(color);
        this.props.pixels.forEach((row,index)=>{
            row.forEach((cell,idx)=>{
                console.log(cell);
                this.props.pixels[index][idx]=color;
            })
        })
    }

    render() {
        this.props.pixels[4][4]='red';    
        console.log('render');
        return (            
            <div class='tft'>
                <table><tbody>                
                    {this.props.pixels.map((rows, index) => {
                        return (<tr key={'r' + index.toString()}>
                            {rows.map((cell, c) => {
                                return <td key={'r' + index.toString() +'c'+ c.toString()}
                                    style={
                                        { backgroundColor: cell }
                                    }
                                ></td>
                            })
                            }
                        </tr>)
                    }
                    )}
                </tbody></table>
                <button onClick={()=> this.GFXfillScreen('yellow')}>add</button>
            </div>
        );
    }
}


ReactDOM.render(rootElement(App), document.getElementById('root'));