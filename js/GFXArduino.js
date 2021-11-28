
const rootElement = React.createElement;
const displaywidth = 160;
const displayheight = 128;
const displayscale = 4;


class App extends React.Component {
    constructor(props) {
        super(props);
        let ColorsandKeys = [];
        for (let i = 1; i <= displayheight; i++) {
            let row = [];
            for (let j = 0; j < displaywidth; j++) {
                let key = "r" + i + "c" + j;
                row.push({ key: key, color: 'black' })
            }
            ColorsandKeys.push(row);
        }
        this.state = {
            pixels: ColorsandKeys
        }
        this.testChange = this.testChange.bind(this);
    }

    testChange(newcolor) {
        let pix=JSON.parse(JSON.stringify(this.state.pixels));
        pix.forEach((row, i) => {
            row.forEach((cell, j) => {
                pix[i][j].color = newcolor;
            })
        })        
        this.setState({pixels: pix});           // this is how its done
    }

    render() {
        return (
            <div class='container'>

                <TftScreen handler={this.testChange} pixels={this.state.pixels} width={displaywidth} height={displayheight} scale={displayscale}></TftScreen>
                <ControlPanel handler={this.testChange} ></ControlPanel>
                <CodeBox></CodeBox>
            </div>
        );
    }
}
class TFTPixel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <td className='pixel' style={{ backgroundColor: this.props.color.color }}></td>
        );
    }
}


class TftScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pixels: this.props.pixels
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ pixels: props.pixels })
      }
    render() {
        return (
            <div>
                <div className='TFTScreen' style={{ width: this.props.width * this.props.scale, height: this.props.height * this.props.scale }}>
                    <table><tbody>
                        {this.state.pixels.map((rows, index) => {
                            return (<tr>
                                {rows.map((cell, c) => {
                                    return <TFTPixel key={this.key} color={cell} />
                                })
                                }
                            </tr>)
                        }
                        )}
                    </tbody></table>
                </div>
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
            <div className='ControlPanel'>
                <button onClick={()=> this.props.handler('blue')}>click</button>
            </div>
        );
    }
}
class CodeBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='CodeBox'></div>
        );
    }
}

ReactDOM.render(rootElement(App), document.getElementById('root'));