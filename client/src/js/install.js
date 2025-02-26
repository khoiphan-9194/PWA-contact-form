const butInstall = document.getElementById("buttonInstall");


window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });



butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;
// window.deferredPrompt is the beforeinstallprompt event object that was saved earlier in the beforeinstallprompt event listener.

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  
  window.deferredPrompt = null;
}); 
