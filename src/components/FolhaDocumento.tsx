interface FolhaDocumentoProps{
  children: React.ReactNode;
  isEditing: boolean;
  onToggleEdit: ()=> void;
  className?: string;
}

export function FolhaDocumento({children, isEditing, onToggleEdit, className}: FolhaDocumentoProps){
    return(
        <main className={`min-h-screen p-4 sm:p-8 md:p-12 flex justify-center ${className}`}>
            <div className='bg-white w-full max-w-4xl p-8 sm:p-12 md:p-16 shadow-lg'>
                <button onClick={onToggleEdit} className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-bold mb-2 cursor-pointer">
                    {isEditing ? 'Concluir Edição' : 'Editar'}
                </button>
                {children}
            </div>
        </main>
    )
}