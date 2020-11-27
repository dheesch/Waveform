import { Component } from 'preact';
import style from './style.css';
import { generate } from '../../lib/waveform'

class Waveform extends Component {

  constructor() {
    super()
    var generatedPoints = generate()
    this.state = {
      pointStack: generatedPoints,
      points: [],
      maxPoints: generatedPoints.length,
      height: 500,
      width: 900
    }
  }

  componentDidMount() {

    this.renderLoop = setInterval(() => {
      // console.log(this.state.pointStack)
      // console.log(this.props.start)
      if (!this.props.start) {
        return
      }
      var a, b, pointData
      var tempStack = this.state.pointStack
      var tempPoints = this.state.points

      if (tempStack == 0) {
        tempStack = generate()
        tempPoints = []
        // clearInterval(this.renderLoop)
      }

      a = tempStack.shift()
      b = tempStack.shift()
      tempStack.unshift(b)

      var index = tempPoints.length

      /***
       * x1,y1 - coordinates of first position
       * x2,y2 - coordinates of control position for bezier curve
       * x3,y2 - coordinates of final position 
       */
      var halfHeight = this.state.height / 2.0
      pointData = {
        begin: {
          x: index * (this.state.width / this.state.maxPoints),
          y: halfHeight - a
        },
        control: {
          x: ((((index + 1) - index) / 2.0) + index) * (this.state.width / this.state.maxPoints),
          y: (1 - .75) * (halfHeight - a) + .75 * (halfHeight - b)
        },
        end: {
          x: (index + 1) * (this.state.width / this.state.maxPoints),
          y: halfHeight - b
        },
      }
      var output = 'M'
      output += pointData.begin.x + ',' + pointData.begin.y + ' C '
      output += pointData.begin.x + ',' + pointData.begin.y + '\t'
      output += pointData.control.x + ',' + pointData.control.y + '\t'
      output += pointData.end.x + ',' + pointData.end.y + ' Z'
      // console.log(document.getElementById('waveform-container').offsetWidth)

      pointData.svg = output

      tempPoints.push(output)

      this.setState({
        pointStack: tempStack,
        points: tempPoints
      })


    }, 16.66666667)
  }

  componentWillUnmount() {
    clearInterval(this.renderLoop)
  }

  render() {
    return <div>
      <h1> {this.props.start}</h1>
      <svg width={this.state.width} height={this.state.height} viewBox={'0 0 ' + this.state.width + ' ' + this.state.height} preserveAspectRatio>
        <line
          x1="0"
          y1={this.state.height / 2.0}
          x2={this.state.width}
          y2={this.state.height / 2.0}
          strokeWidth='1'
          stroke='black'
        />
        {this.state.points.map((point, i) =>
          <path
            d={point}
            strokeWidth='1'
            stroke='black'
          />
        )}
      </svg>

    </div>
  }
}


export default Waveform