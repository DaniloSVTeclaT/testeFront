import React,{useState, useEffect,useRef} from 'react';
import axios from 'axios';
import { FiLogIn, FiMail, FiLock, FiEdit, FiPower, FiTrash, FiTrash2 } from 'react-icons/fi';
import { parseISO } from 'date-fns'; 
import { zonedTimeToUtc,format} from 'date-fns-tz';


import Table from '../../components/tabela/index'
import { Link } from "react-router-dom";

import Button from '../../components/Button';
import { useAuth,AuthProvider } from "../../hooks/auth";


import logoImg from '../../assets/Tasks-trasnparente.png';

import api from '../../services/api'
import { Container,Profile,Header,HeaderContent,Section,List,RegistrationUpdate} from './styles';
import { icons } from 'react-icons/lib';
import { Content } from '../SignIn/styles';
import { toDate } from 'date-fns-tz/esm';

interface Tasks {
    id:string;
    order:number;
    name:string;
    description:string;
    updated_at:Date;
    status:string;
}

const Dashboard: React.FC = () =>  {
    const inputRef = useRef<HTMLInputElement>(null);
    const goToken = localStorage.getItem('@GoBarber:token');
    const [nameTasks,setNameTasks] = useState('')
    const [DescriptionTask,setDescriptionTasks] = useState('')
    const [statusTasks,setStatusTasks] = useState('')
    
    const [idTasks,setIdTasks]=useState('')
    const [modoEditar,setModoEditar] = useState(false)
    const parsedDate = parseISO('2018-04-01 16:00:00');
    const znDate = zonedTimeToUtc(parsedDate, 'America/Sao_Paulo');
    const { signOut, user } = useAuth();
    const nomeuser = user.name
    
    
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
      }, [])
    
    async function addTasks(): Promise<void> {
        api.defaults.headers.Authorization = `Bearer ${goToken}`;
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
       
    }

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
                    <form name='Editar' onSubmit={updateTasks}>  
                    <h1>Editar Tarefas</h1>
                    
                    <input  value={nameTasks}

                        onChange={e => setNameTasks(e.target.value)} 
                        type="text" 
                        placeholder="Nome tarefa"
                        
                    />
                    <input 
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
                </form>
                
                :    
                
                <form onSubmit={addTasks}>  
                <h1>Cadastrar Tarefas</h1>
                
                <input 
                    ref={inputRef}
                    onChange={e => setNameTasks(e.target.value)} 
                    type="text" 
                    placeholder="Nome tarefa"
                   
                />
                <input 
                    onChange={e => setDescriptionTasks(e.target.value)} 
                    type="text" 
                    placeholder="Breve Descrição"
                    
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
                </form>}
                
                </RegistrationUpdate>  
                
          </Content>
        <Content>  
            <List> 
                <form>
                    
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
                </form> 
            </List> 
         </Content>
      </Section>                              
    </Container>
  );
};
  
  export default Dashboard;