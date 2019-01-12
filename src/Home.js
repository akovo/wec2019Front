import React, { Component } from 'react';
import {Button, Form, Container, Message } from 'semantic-ui-react'
import Graph from 'vis-react';
import './App.css';

   
  
   
  
class Home extends Component {     
    test = false  
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
            entryAndExit:[],
            graph: {
                nodes: [
                    // {id: 0, label: 0,value:0,x:0,y:100,hidden : false},
                    // {id: 9999, label: 0,value:0,x:200,y:100,hidden : false},
                    
                ],
                edges: [
                    //DO NOT ALTER
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
        this.handleDone = this.handleDone.bind(this);
    }
    
    handleSubmit(event){
        const num = this.state.processNum;
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
            newNodes.push({id: 0, label: 0,value:0,x:0,y:100,hidden : false});
            
            newNodes.push({id: 1, label: parseInt(this.state.newL1),value:parseInt(this.state.newL1),x:(200),y:0});
            newNodes.push({id: 2, label: parseInt(this.state.newL2),value:parseInt(this.state.newL2),x:(200),y:200});
            newEdges.push(
                {from:0, to:1,value:0,label:0,arrows:'to'},
                {from:0, to:2,value:0,label:0,arrows:'to'}
            );
        }
        else{
            console.log(num);
            newNodes.push({id: (num+1)*2-1, label: parseInt(this.state.newL1),value:parseInt(this.state.newL1),x:((num+1)*200),y:0});
            newNodes.push({id: (num+1)*2, label: parseInt(this.state.newL2),value:parseInt(this.state.newL2),x:((num+1)*200),y:200});
            newEdges.push({from: (num)*2-1, to: (num+1)*2-1,value:0,label:0,arrows:'to'})
            newEdges.push({from: (num)*2, to: (num+1)*2,value:0,label:0,arrows:'to'})
            newEdges.push({from: (num)*2-1, to: (num+1)*2,value:parseInt(this.state.transitL1),label:parseInt(this.state.transitL1),arrows:'to'})
            newEdges.push({from: (num)*2, to: (num+1)*2-1,value:parseInt(this.state.transitL2),label:parseInt(this.state.transitL2),arrows:'to'})
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
    handleDone(event){
        
        if(!this.test){
            const num = this.state.processNum;
            const newNodes = [
                ...this.state.graph.nodes
            ]
            const newEdges = [
                ...this.state.graph.edges
            ];
            newNodes.push({id: 9999, label: 0,value:0,x:num*200+200,y:100,hidden : false});
            newEdges.push(
                {from:(num*2-1), to:9999,value:0,label:0,arrows:'to'},
                {from:num*2, to:9999,value:0,label:0,arrows:'to'}
            );
            newEdges[newEdges.length-1].value = this.state.entryAndExit[3];
            newEdges[newEdges.length-2].value = this.state.entryAndExit[2];
            newEdges[1].value = this.state.entryAndExit[1];
            newEdges[0].value = this.state.entryAndExit[0];
            
            this.setState({
                ...this.state,
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
            this.test = true;
        }
        else{
            console.log(this.state)
        }
        
        
    }
    handleChange(event){
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        });
    }
    handleEdgeChange(e, index) {
        const newEntryAndExit = [
            ...this.state.entryAndExit
        ];
        newEntryAndExit[index] = parseInt(e.target.value);
        this.setState({
            ...this.state,
            entryAndExit : newEntryAndExit
        });

    }
    render() {
        return (
                
                <Container>
                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Input fluid type="number"  label='Line 1 Entry Cost' onChange={e => this.handleEdgeChange(e, 0)}  />
                            <Form.Input fluid type="number"  label='Line 2 Entry Cost' onChange={e => this.handleEdgeChange(e, 1)}  />
                            <Form.Input fluid type="number" label='Line 1 Exit Cost'  onChange={e => this.handleEdgeChange(e, 2)}/>
                            <Form.Input fluid type="number" label='Line 2 Exit Cost'  onChange={e => this.handleEdgeChange(e, 3)}/>
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
                    <hr></hr>
                    <Form onSubmit={this.handleDone}>
                        <Button type='Submit'>Done</Button>
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
