import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object'

export default Controller.extend({

    
    dataService: service('data'),

    actions:{
       async saveAuthor(author){
            await this.get('dataService').createAuthor(author);
            this.get('model').set('firstName', author.firstName);
            this.get('model').set('lastName', author.lastName);
            this.transitionToRoute('author.index');
        },
        changeFirstName(firstName){
            this.set('firstName', firstName)
        },
        changeAuthor(){
            this.get('author').set('firstName','Name');
            this.get('author').set('lastName','Surname');  
        }
        
    }
});
