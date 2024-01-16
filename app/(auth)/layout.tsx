const AuthLayout = ({ children }:{
    children: React.ReactNode
 }) => {
 
     return(
         <div className="flex mt-20 justify-center items-center">
             {children}
         </div>
     )
 }
 
 export default AuthLayout;