

function Right() {
  return (
    <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-200" style={{ backgroundImage: "url('/images/signup-header.png)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} ></div>
      <div className="relative z-20 flex items-center text-lg font-medium">MBMV.io</div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">“ Videoc: where distance becomes a mere inconvenience in the language of seamless business connections.”</p>
          <footer className="text-sm">GPT-4</footer>
        </blockquote>
      </div>
    </div>
  )
}

export default Right  