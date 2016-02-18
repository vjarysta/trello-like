'use strict';

angular.module('projects').controller('ProjectsController', ['$scope', 'Authentication', 'Admin', 'Projects', '$http', '$stateParams', '$state', 'Lists',
  function ($scope, Authentication, Admin, Projects, $http, $stateParams, $state, Lists) {
    /*
    ** Runs at controller startup
    */
    var myId = '';
    $scope.states = {
      newList: false
    };
    $scope.newProject = {
      members: []
    };
    $scope.newList = {
      name: ''
    };
    if (Authentication.user) {
      Admin.query(function (data) {
        $http.get('/api/users/me')
          .then(function(result) {
            myId = result.data._id;
            $scope.newProject.members.push(myId);
          });
        $scope.users = data;
      });
    }

    /*
    ** Creates a project
    */
    $scope.create = function(isValid) {
      Projects.save($scope.newProject)
        .$promise.then(function(res, err) {
          swal({
            title: 'Good job!',
            text: 'Your project is now created',
            type: 'success',
            closeOnConfirm: true
          },
          function() {
            $scope.list();
            $state.go('project-view', { projectId: res._id });
          });
        }, function(err) {
          swal('Oops...', err.data.message, 'error');
        });
    };
    
    /*
    ** Lists projects
    */
    
    $scope.list = function() {
      
      var successCallback = function(res) {
        $scope.projects = res;
      };
      
      var errorCallback = function(err) {
        swal('Oops...', 'Something went wrong!', 'error');
      };
      
      Projects.query()
        .$promise.then(successCallback, errorCallback);
    };
    
    /*
    ** Get the current project given in url params
    */
    $scope.read = function() {
      Projects.get({
        projectId: $stateParams.projectId
      }).$promise.then(function(res, err) {
        if (err) {
          swal('Oops...', 'Something went wrong!', 'error');
        } else {
          $scope.project = res;
          $scope.tasks = [
            {
              name: 'Trello-like',
              description: 'Best project ever'
            },
            {
              name: 'Hello world',
              description: 'This description is very long. So long, like a snake. A snake who would have eaten 50 apples.'
            },
            {
              name: 'Very long',
              description: 'Nisi mihi Phaedrum, inquam, tu mentitum aut Zenonem putas, quorum utrumque audivi, cum mihi nihil sane praeter sedulitatem probarent, omnes mihi Epicuri sententiae satis notae sunt. atque eos, quos nominavi, cum Attico nostro frequenter audivi, cum miraretur ille quidem utrumque, Phaedrum autem etiam amaret, cotidieque inter nos ea, quae audiebamus, conferebamus, neque erat umquam controversia, quid ego intellegerem, sed quid probarem. Oportunum est, ut arbitror, explanare nunc causam, quae ad exitium praecipitem Aginatium inpulit iam inde a priscis maioribus nobilem, ut locuta est pertinacior fama. nec enim super hoc ulla documentorum rata est fides. Quod opera consulta cogitabatur astute, ut hoc insidiarum genere Galli periret avunculus, ne eum ut praepotens acueret in fiduciam exitiosa coeptantem. verum navata est opera diligens hocque dilato Eusebius praepositus cubiculi missus est Cabillona aurum secum perferens, quo per turbulentos seditionum concitores occultius distributo et tumor consenuit militum et salus est in tuto locata praefecti. deinde cibo abunde perlato castra die praedicto sunt mota. Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum. Ideoque fertur neminem aliquando ob haec vel similia poenae addictum oblato de more elogio revocari iussisse, quod inexorabiles quoque principes factitarunt. et exitiale hoc vitium, quod in aliis non numquam intepescit, in illo aetatis progressu effervescebat, obstinatum eius propositum accendente adulatorum cohorte. Et eodem impetu Domitianum praecipitem per scalas itidem funibus constrinxerunt, eosque coniunctos per ampla spatia civitatis acri raptavere discursu. iamque artuum et membrorum divulsa conpage superscandentes corpora mortuorum ad ultimam truncata deformitatem velut exsaturati mox abiecerunt in flumen. Adolescebat autem obstinatum propositum erga haec et similia multa scrutanda, stimulos admovente regina, quae abrupte mariti fortunas trudebat in exitium praeceps, cum eum potius lenitate feminea ad veritatis humanitatisque viam reducere utilia suadendo deberet, ut in Gordianorum actibus factitasse Maximini truculenti illius imperatoris rettulimus coniugem. Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum. Ut enim benefici liberalesque sumus, non ut exigamus gratiam (neque enim beneficium faeneramur sed natura propensi ad liberalitatem sumus), sic amicitiam non spe mercedis adducti sed quod omnis eius fructus in ipso amore inest, expetendam putamus. Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.'
            },
            {
              name: 'Blah blah',
              description: 'Very cool content'
            },
            {
              name: 'No description',
              description: ''
            }, 
          ];
        }
      });
    };
    
    /*
    ** Updates a project (In case of time remaining, secure in back)
    ** From route '/projects/:projectId/edit'
    */
    $scope.update = function(isValid) {
      
      var successCallback = function(res) {
        $state.go('project-view', { projectId: res._id });
      };
      
      var errorCallback = function(err) {
        swal('Oops...', err.data.message, 'error');
      };
      
      $scope.project.$update(successCallback, errorCallback);
    };
    
    /*
    ** Asks confirmation to user, then removes the project
    */
    $scope.remove = function(project) {
      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover your project!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: true
      }, function() {
        project.$delete();
        $state.go('projects-list');
      });
    };
    
    /*
    ****************************************************************************
    */
    
    /*
    ** Create a new list in the current project
    */
    $scope.createList = function(isValid) {
      if (!isValid || $scope.newList.name === '') {
        swal('Oops...', 'Invalid list name', 'error');
      } else {
        var list = new Lists();
        list.name = $scope.newList.name;
        list.projectId = $scope.project._id;
        list.$save();
        console.log($scope.newList);
        $scope.states.newList = false;
      }
    };
  }
]);
