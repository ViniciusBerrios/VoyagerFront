import React, { Component } from 'react';
import '../../Assets/css/listViews.css';
import DataTable from 'react-data-table-component';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import ReactDataTablePagination from 'react-datatable-pagination'
import {Button,Input,Footer,Card,CardBody,CardImage,CardTitle,CardText} from "mdbreact";
  

export default class listViews extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            conditions: [],
            answers: [],
            answerFilters: [],
            order: { name: '', type: '' },
            columns: [],
            views: [],
            listaView: [],
            arrayOfObjects: [{ title: 'Conan the Barbarian', year: '2002' }, { title: 'Abc the Barbarian', year: '1971' }, { title: 'Cba the Barbarian', year: '1983' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }],
            arrayFilter: [{ title: 'Conan the Barbarian', year: '2002' }, { title: 'Abc the Barbarian', year: '1971' }, { title: 'Cba the Barbarian', year: '1983' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }, { title: 'Dab the Barbarian', year: '1880' }]
        }
    }

    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchViews();
    }
    
    searchViews() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ views: data }))
            .catch(error => console.log(error))
    }


    searchFields() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ field: data }))
            .catch(error => console.log(error))
    }

    searchAnswers() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ answer: data }))
            .catch(error => console.log(error))
    }
    selectView = (view) => {
        this.setState({ currentView: view })

        let result = [];
        this.state.listaView.map(element => {
            if (element.titleView === this.state.currentView) {
                element.column.map(element1 => {
                    result.push({ name: element1[0].fieldName, selector: element1[0].fieldName })
                })

            }
        })
        this.setState({ currentColumns: result })

        const listFields = [];
        this.state.answer.map((answer) => {
            const fields = Object.keys(answer.answer)
            fields.map((field) => {
                listFields.push(answer.answer[field]);
            })
        })

        const uniqueAnswers = new Set(listFields.map(item => item));
        this.setState({ answerFilters: uniqueAnswers }, () => {
            uniqueAnswers.push({ uniqueAnswers: uniqueAnswers })
        });

        this.setState({ answerFilters: uniqueAnswers })
        console.log(uniqueAnswers)
    }

    handleValue = (event) =>{
        let filter = this.state.arrayOfObjects.filter(element =>{
            return element.title.toLowerCase().indexOf(event.target.value) !== -1 
        })

        this.setState({arrayFilter: filter})
    }

    render() {
        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
                right: true,
            },
        ]

        return (
            
            <div>
            <div class="wrap">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={this.handleValue} />
                    <button type="submit" class="searchButton">
                   <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div>     
                <ReactDataTablePagination arrayOfObjects={this.state.arrayFilter} dataInOnePage={5}/>
            </div>
            <div>
            <select >
          <option value="5">5</option>
            </select>
            </div>

                {/* <table className="listaView">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.views.map((view, index) => {
                            return (
                                <tr key={index}>
                                    <button onClick={() => this.selectView(view.titleView)}>{view.title}</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}

                {/* <DataTable
                    // title="Arnold Movies"
                    columns={this.state.currentColumns}
                    data={this.state.answerFilters}

                /> */}
            
            </div>
        )
    }
};