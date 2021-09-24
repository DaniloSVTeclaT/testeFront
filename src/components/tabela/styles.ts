import styled from 'styled-components';



export const Container = styled.div`
table {
	font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}	
.IconTable:hover{
  color:black;
}
.IconTableDelete{
  color:#ff0000;
}
.IconTableDelete:hover{
  color:#8b0000;
}
td,  th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
`;