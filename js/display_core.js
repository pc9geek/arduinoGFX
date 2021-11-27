'use strict';
import {ControlPanel} from './control_panel';

const rootElement = React.createElement;

class DisplayArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class='container'>
                <div class='displayArea'>
                    <DisplayScreen width="160" height="128"></DisplayScreen>
                </div>
                <ControlPanel>P</ControlPanel>
                <div class='output'></div>
            </div>
        );
    }

}

class DisplayScreen extends React.Component {
    constructor(props) {
        super(props);
        var pix = [];
        for (let i = 0; i < props.height; i++) {
            pix.push([]);
        }
        let cnt=1;
        pix.forEach(item => {
            for (let x = 0; x < props.width; x++) {
                item.push('black');                
                cnt++;
            }
        }
        )
        this.state = {
            backColor: "black",
            pixels: pix,
        }
    }
    clicked=()=>{
        var px=this.state.pixels;
        px[4][4]='red';
        this.setState({pixels: px});
    }
    render() {
        return (
            <div class='tft'>
                <table><tbody>
                    {this.state.pixels.map((rows,index) => {
                        return (<tr key={'r'+index.toString()}>
                            {rows.map((cell,c) => {
                                return <td key={'rc'+index.toString() +c.toString()}
                                style={
                                    {backgroundColor: cell}
                                  }
                                ></td>
                            })
                            }
                        </tr>)
                    }
                    )}
                </tbody></table>
                <button onClick={this.clicked}>Click Me</button>
            </div>
        );
    }
}


ReactDOM.render(rootElement(DisplayArea), document.getElementById('root'));