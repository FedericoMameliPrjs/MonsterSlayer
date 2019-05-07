/*
	Per iniziare una partita cliccare su "New Game".
	Verranno mostrati le azioni possibili
	"attck", "Special Attack", "heal" e "give up".
	
	ATTACK => i due giocatori subiscono del danno random(0-10)
	SPECIAL ATTACK =>(0-20)
	HEAL => Il giocatore recupera 10 punti, ma viene attaccato dal mostro
	GIVE UP => esce dal gioco
*/

new Vue({
	el:'#app',
	data:{
		player1_hp: 100,
		player2_hp: 100,
		newGameScreen: true,
		steps:[]

	},
	methods:{
		initGame: function(newGame = false){
			if(newGame){
				this.newGameScreen = false;
				this.player1_hp = 100;
				this.player2_hp = 100;
				this.steps = [];
			}else {
				this.newGameScreen = true;
				this.player1_hp = 100;
				this.player2_hp = 100;
				this.steps = [];
			}
		},

		damage: function(playerScore, maxDamage){
			var damage = Math.round(Math.random() * maxDamage);
			
			if((playerScore - damage) <= 0) damage = playerScore ;
			
			return damage;
		},

		heal: function(){
			var damage;
			var heal = 10;

			if((this.player1_hp + 10) > 100)
				heal = 100 - this.player1_hp;

			this.player1_hp += heal;
			this.addStep({player:true, text:'Player1 heals for ' + heal + ' points.'});

			damage = this.damage(this.player1_hp, 15)
			this.player1_hp -= damage;
			this.addStep({player:false, text:'Monster hits Player1 for ' + damage + ' points.'});
		},

		attack: function(){
			var damage;

			damage = this.damage(this.player1_hp, 10);
			this.player1_hp -= damage;
			this.addStep({player: false, text:'Monster hits Player1 for ' + damage + ' points.'});

			damage = this.damage(this.player2_hp, 10);
			this.player2_hp -= damage;
			this.addStep({player:true, text:'Player1 hits Monster for ' + damage + ' points.'});
		},

		specialAttack: function(){
			var damage;

			damage = this.damage(this.player1_hp, 20);
			this.player1_hp -= damage;
			this.addStep({player:false, text:'Monster hits Player1 for ' + damage + ' points.'});

			damage = this.damage(this.player2_hp, 20);
			this.player2_hp -= damage;
			this.addStep({player:true, text:'Player1 hits Monster for ' + damage + ' points.'});
		},

		giveUp: function(){
			this.newGameScreen = !this.newGameScreen;
			this.steps = [];

			var winnerStr;

			if(this.player1_hp > this.player2_hp)
				winnerStr = 'You win!!!';
			else 
				winnerStr = 'Monster wins :(';

			var str = 'Player gave up.\nGame ends with\nYou : '+ this.player1_hp + ' points.\nMonster : ' + this.player2_hp + ' points.\n';
			this.addStep(winnerStr);

			this.alert(str + winnerStr + '\n\nDo you want to start a new Game?');
		},

		addStep: function(obj){
			/*
				obj.damage => true -> background red
				obj.damage => false -> background green
				obj.text => -> step text
			*/
			this.steps.unshift(obj);
		},

		alert: function(string){
			var conf = confirm(string);
			if(conf) this.initGame(true);
			else this.initGame();
		}
	},
	watch:{
		player1_hp: function(){
			if(this.player1_hp <= 0)
				this.alert('THE MONSTER WINS :(\nDo you want to start a new Game?');
		},
		player2_hp: function(){
			if(this.player2_hp <= 0)
				this.alert('YOU HAVE WIN!!!\nDo you want to start a new Game?');
		}
	}
});