import React,{useState, useEffect,useCallback} from 'react';
import { Form } from '@unform/web'
import {  FiEdit, FiPower, FiTrash2 } from 'react-icons/fi';
import { toDate} from 'date-fns-tz';
//import { FormHandles } from '@unform/core';


import Table from '../../components/tabela/index'

import Button from '../../components/Button';
import { useAuth } from "../../hooks/auth";



import logoImg from '../../assets/Tasks-trasnparente.png';

import api from '../../services/api'
import { Container,Profile,Header,HeaderContent,Section,List,RegistrationUpdate} from './styles';
import { Content } from '../SignIn/styles';
import Input from '../../components/Input';


interface Tasks {
    id:string;
    order:number;
    name:string;
    description:string;
    updated_at:Date;
    status:string;
}
// interface CadastraFormData{
//     name:string;
//     description:string;
//     user_id: string;
//     status:string;
//     braba:string;
// }

const Dashboard: React.FC = () =>  {
   // const formRef = useRef<FormHandles>(null);

    const goToken = localStorage.getItem('@GoBarber:token');
    const [nameTasks,setNameTasks] = useState('')
    const [DescriptionTask,setDescriptionTasks] = useState('')
    const [statusTasks,setStatusTasks] = useState('')
    
    const [idTasks,setIdTasks]=useState('')
    const [modoEditar,setModoEditar] = useState(false)
    const { signOut, user } = useAuth();
    
    
    const [tasks, setTasks] = useState<Tasks[]>([])
    //api.defaults.headers.Authorization = `Bearer ${ String(gotoken)}`;
    
    

    useEffect(() => {
        api.get(`tasks/users/${user.id}`,{
          headers:{
            Authorization: `Bearer ${goToken}`
          }

        }).then(response => {
            setTasks(response.data)
          
          })
      }, [goToken,user.id])
    const addTasks = useCallback(async()=>{
        api.defaults.headers.Authorization = `Bearer ${goToken}`;
        

        //alert (data.name)
        await api.post('tasks', {
            name:nameTasks,
            description:DescriptionTask,
            user_id: user.id,
            status:statusTasks,
           
        });
        

        await  api.get(`tasks/users/${user.id}`,{
            headers:{
              Authorization: `Bearer ${goToken}`
            }
           }).then(response => {
              setTasks(response.data)
             
            });

        setIdTasks('')
        setNameTasks('')
        setDescriptionTasks('')
        setStatusTasks('')
    },[DescriptionTask,goToken,nameTasks,statusTasks,user.id])
    // async function addTasks(): Promise<void> {
    //     api.defaults.headers.Authorization = `Bearer ${goToken}`;
    //     await api.post('tasks', {
    //         name:nameTasks,
    //         description:DescriptionTask,
    //         user_id: user.id,
    //         status:statusTasks,
           
    //     });
    

    //     await  api.get(`tasks/users/${user.id}`,{
    //         headers:{
    //           Authorization: `Bearer ${goToken}`
    //         }
    //        }).then(response => {
    //           setTasks(response.data)
             
    //         });

    //     setIdTasks('')
    //     setNameTasks('')
    //     setDescriptionTasks('')
    //     setStatusTasks('')
       
    // }

    async function removeTasks(id:string) {
        
        await api.delete( `tasks/${id}`,{
            
            headers:{
              Authorization: `Bearer ${goToken}`
            }
            
           })
        
          
           await api.get(`tasks/users/${user.id}`,{
            headers:{
              Authorization: `Bearer ${goToken}`
            }
           }).then(response => {
              setTasks(response.data)
             
            });
           

    }


    async function botaoEditar(id:string,nome:string,descricao:string,status:string){
        setModoEditar(true)
        setIdTasks(id)
        setNameTasks(nome)
        setDescriptionTasks(descricao)
        setStatusTasks(status)
        
    }
    async function updateTasks(){
        
        api.defaults.headers.Authorization = `Bearer ${goToken}`;
        await api.patch(`tasks/${idTasks}`, {
            id:idTasks,
            name:nameTasks,
            description:DescriptionTask,
           
            status:statusTasks,
           
        });
        await api.get(`tasks/users/${user.id}`,{
            headers:{
              Authorization: `Bearer ${goToken}`
            }
           }).then(response => {
              setTasks(response.data)
             
            });
            setModoEditar(false)
            setIdTasks('')
            setNameTasks('')
            setDescriptionTasks('')
            setStatusTasks('')
    }



return (

    <Container>

      <Header>
            <HeaderContent>
            <img src={logoImg} alt="Tasks" />

            <Profile>
                
                <div>
                <p>Bem vindo,</p>
                <p>{user.name}</p>
                
                </div>
            </Profile>

            <button  type="button" onClick={signOut}>
                <FiPower />
            </button>
            </HeaderContent>
      </Header>
      <Section>    
        <Content>
          
            <RegistrationUpdate>   
          
                
                {modoEditar ?    

                <Form  onSubmit={updateTasks}>
                    
                        <h1>Editar Tarefas</h1>
                        
                        <Input  

                            name="nome"
                           
                            className={"InputH"}
                            value={nameTasks}

                            onChange={e => setNameTasks(e.target.value)} 
                            type="text" 
                            placeholder="Nome tarefa"
                            
                        />
                        <Input 
                            name="descricao"
                            className={"InputH"}
                            onChange={e => setDescriptionTasks(e.target.value)} 
                            type="text" 
                            placeholder="Breve Descrição"
                            value={DescriptionTask}
                        />

                        <select onChange={e => 
                            setStatusTasks(e.target.value)} 
                            value={statusTasks} 
                            
                            id="selection_text" 
                            name="atividades"
                            >
                            <option value="NOT_DONE">NOT_DONE</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                            
                        </select>
                    <Button type="submit" >Editar</Button>
                </Form>
                
                :    
                <Form  onSubmit={addTasks}>
               
                        <h1>Cadastrar Tarefas</h1>
                        
                        <Input 
                            value={nameTasks}
                            name="nome"
                            className={"InputH"}
                            onChange={e => setNameTasks(e.target.value)} 
                            type="text" 
                            placeholder="Nome tarefa"
                        
                        />
                        <Input 
                            name="descricao"
                            className={"InputH"}
                            onChange={e => setDescriptionTasks(e.target.value)} 
                            type="text" 
                            placeholder="Breve Descrição"
                            value={DescriptionTask}
                        />
                        

                        <select onChange={e => 
                            setStatusTasks(e.target.value)} 
                            id="selection_text" 
                            name="atividades"
                        >
                            <option value="NOT_DONE">NOT_DONE</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                            
                        </select>
                        <Button type="submit" >Cadastrar</Button>
                </Form>}
                
                </RegistrationUpdate>  
                
          </Content>
        <Content>  
            <List> 
            

                    <p>LISTA DE TAREFAS:</p>
                    
                    <Table>

                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>nome</th>
                                    <th>descrição</th>
                                    <th>data</th>
                                    <th>status</th>
                                    <th>editar</th>
                                    <th>excluir</th>
                                </tr>
                                </thead>
                                {tasks.map(dados => (
                                    <thead>
                                        <tr
                                            key={dados.id}
                                        >
                                            <td>{dados.order}</td>
                                            <td>{dados.name}</td>
                                            <td>{dados.description}</td>
                                            <td>{String((toDate(dados.updated_at)))}</td>
                                            <td>{dados.status}</td>
                                            <td className={"IconTable"} onClick={()=>{botaoEditar(dados.id,dados.name,dados.description,dados.status)}}> <  FiEdit size={24} /> </td>
                                            <td className={"IconTableDelete"}  onClick={()=>{removeTasks(dados.id)}}>< FiTrash2 size={24}/> </td>
                                            
                                        </tr>
                                    </thead>
                                   )
                                  )
                                }
                    
                    </Table>
                    
            </List> 
         </Content>
      </Section>                              
    </Container>
  );
};
  
  export default Dashboard;