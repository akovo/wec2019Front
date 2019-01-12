import React, { Component } from 'react';
import {Button, Form, Container, Message } from 'semantic-ui-react'
import Graph from 'vis-react';
import './App.css';

   
  
   
  
class Home extends Component {       
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errHidden: true,
            errVisible: false,
            newL1:'',
            newL2:'',
            transitL1:'',
            transitL2:'',
            newProcess:'',
            Processes:[],
            processNum:0,
            graph: {
                nodes: [
                    {id: 0, label: 'Node 0',value:10,x:0,y:100,hidden : true},
                    {id: 9999, label: 'Node 9999',value:10,x:800,y:100,hidden : true},
                    
                ],
                edges: [
                    //DO NOT ALTER
                    {id:0,from:0, to:1,value:0,label:0,arrows:'to'},
                    {id:1,from:0, to:2,value:0,label:0,arrows:'to'},
                    {from:5, to:9999,value:10,label:10,arrows:'to'},
                    {from:6, to:9999,value:10,label:10,arrows:'to'}
                  ]
               },
               options: {
                physics:false,
                interaction:{
                    dragNodes:false,
                    dragView: false,
                },
                autoResize: true,
                height: '1000px',
                width: '100%',
                //locales:locales,
                layout: {
                    hierarchical: false,
                    improvedLayout:false
                },
            },
            events:  {
                select: function(event) {
                    var { nodes, edges } = event;
                }
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdgeChange = this.handleEdgeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(event){
        
        const newProcesses = [
            ...this.state.Processes
        ];
        const newNodes = [
            ...this.state.graph.nodes
        ]
        const newEdges = [
            ...this.state.graph.edges
        ];
        if(this.state.processNum == 0){
            newNodes.push({id: 1, label: this.state.newL1,value:this.state.newL1,x:200,y:0});
            newNodes.push({id: 2, label: this.state.newL2,value:this.state.newL2,x:200,y:0});
            newEdges[2].from = 1;
            newEdges[3].from = 2;
        }
        else{
            newNodes.push({id: this.state.processNum*2-1, label: this.state.newL1,value:this.state.newL1,x:200,y:0});
            newNodes.push({id: this.state.processNum*2, label: this.state.newL2,value:this.state.newL1,x:200,y:0});
            newEdges.push({from: this.state.processNum*2-3, to: this.state.processNum*2-1,value:0,label:0,arrows:'to'})
            newEdges.push({from: this.state.processNum*2-2, to: this.state.processNum*2,value:0,label:0,arrows:'to'})
            newEdges.push({from: this.state.processNum*2-3, to: this.state.processNum*2,value:this.state.transitL1,label:this.state.transitL1,arrows:'to'})
            newEdges.push({from: this.state.processNum*2-2, to: this.state.processNum*2-1,value:this.state.transitL2,label:this.state.transitL2,arrows:'to'})
            newEdges[2].from = this.state.processNum*2-1;
            newEdges[3].from = this.state.processNum*2;
        }
        var newProcessNum = this.state.processNum;
        newProcessNum++;

        newProcesses.push(this.state.newProcess);
        this.setState({
            ...this.state,
            processNum:newProcessNum,
            Processes: newProcesses,
            graph: {
                ...this.state.graph,
                nodes:[
                    ...newNodes
                ],
                edges: [
                    ...newEdges
                ]
            } 
        });
        
        console.log(this.state);
    }
    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        });
    }
    handleEdgeChange(e, index) {
        const newEdges = [
            ...this.state.graph.edges
        ];
        newEdges[index].label = parseInt(e.target.value);
        newEdges[index].value = parseInt(e.target.value);
        this.setState({
            ...this.state,
            graph: {
                ...this.state.graph,
                edges: [
                    ...newEdges
                ]
            }   
        });

        console.log(this.state);

    }
    render() {
        return (
                
                <Container>
                    <p>DANE{this.state.graph.edges[0].label}</p>
                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Input fluid type="number"  label='Line 1 Entry Cost' onChange={e => this.handleEdgeChange(e, 0)}  />
                            <Form.Input fluid type="number"  label='Line 2 Entry Cost' onChange={e => this.handleEdgeChange(e, 1)}  />
                            <Form.Input fluid type="number" label='Line 1 Exit Cost'  />
                            <Form.Input fluid type="number" label='Line 2 Exit Cost'  />
                        </Form.Group>
                        {/* <Button type='submit'>Submit</Button> */}
                    </Form>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Process Name' name="newProcess" onChange={e => this.handleChange(e)} />
                            <Form.Input fluid type="number" name="newL1"  label='Cost of Process (Line1)'   onChange={e => this.handleChange(e)}/>
                            <Form.Input fluid type="number"  name ="newL2" label='Cost of Process (Line2)'  onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <h3>Travel Costs (Only enter if NOT first process)</h3> 
                        <Form.Group widths='equal'>  
                            <Form.Input fluid type="number"  name ="transitL1" label='Cost of Travel L1->L2'  onChange={e => this.handleChange(e)}/>
                            <Form.Input fluid type="number"  name ="transitL2" label='Cost of Travel L2->L1'  onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Button type='submit'>Add Process</Button>
                    </Form>
                <h1>Processes</h1>
                <div>
                    {this.state.Processes.map((p, i) => <h4 key={i}  >{p}</h4>)}
                </div>
                <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />
                </Container>           
        );
    }
}

export default Home;
