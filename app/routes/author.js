import Route from '@ember/routing/route';
import {Promise} from 'rsvp';
import {later} from '@ember/runloop';
import {inject as service} from '@ember/service';
export default Route.extend({
    
    dataService: service('data'),
    queryParams:{
      search:{
        refreshModel:true
      }
    },
    model({search}){
       
        let promise = new Promise((resolve,reject)=>{
             later(async ()=>{
 
           try{     
         let authors = search ? await this.get("dataService").getAuthors(search) : await this.get("dataService").getAuthors() 
                 resolve(authors);
           }
           catch(e){
             reject('connection failed')
             } 
           }, 100);
        }).then((authors)=> {
          this.set('controller.model', authors)
        }).finally(()=>{
          if(promise === this.get('modelPromise')){
            this.set('controller.isLoading',false);
          }
        })
        
      this.set('modelPromise',promise)
        
      return {isLoading:true}
      },

      setupController(controller,model){
        this._super(...arguments);
        if (this.get('modelPromise')){
          controller.set('isLoading',true);
        }
        
      },

        actions:{
          refreshAuthors(){
            this.refresh()
          },
          loading(){
            return false;
          }
        }
});
