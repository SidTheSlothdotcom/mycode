<!DOCTYPE cpp>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
class Entity{
    protected;
    string name;
    int health;
    int attackPower;
    int maxHealth;
public:
    Entity(string n, int hp, int atk) : name(n), health(hp), attackPower(atk) {} virtual ~Entity() = default;
    bool isAlive() const {
        return health > 0;
    }
    string getName() const {
        return name;
    }
    int getHealth() const {
        return health;
    }
     void takeDamage(int damage) {

        health -= damage;

        if (health<=0) health = 0;

        cout <<"takes " << damage <<"damage! (HP: "<< health << "/" << maxHealth << ")\n";

    }

 

    void heal(int amount) {

        health += amount;

        if (health>maxHealth) health = maxHealth;

        cout << name << "recovers" << amount << "HP! (HP: "<< health << "/" << maxHealth << ")\n";

    }
    class Player : public Entity {

private:

    int mana;

    int potions;

 

public:

    Player(string n): Entity(n, 100,15), mana(50), potions(3){}

 

    void attack(Entity* target) override {

        cout << "\n " << name << " strikes " << target->getName() << "with a sword!\n" << endl;

        target->takeDamage(attackPower);

 

    }

    void castSpell(Entity* target) {

        if (mana >=10) {

            mana -=10;

            cout << "\n " << name << " casts a FIREBALL at " << target->getName() << endl;

            target->takeDamage(attackPower*2);

 

        }else {

            cout << "\n> Not Enough Mana! " << name << endl;

 

        }

 

    }

 

    void usePotion() {

        if (potions > 0) {

            potions--;

            cout << "\n> " << name << "drinks a health potion.\n";

            heal(40);

            cout << "\n > Potions Remaining:" << potions << endl;

 

        }else {

            cout << "\n> Out of Potions! Turn wasted.\n";

        }

    }
    class Enemy : public Entity {

public:

    Enemy(string n, int hp, int atk): Entity(n,hp, atk){}

   void attack(Entity* target) override {

        cout <<" \n> " << name << " lunges at  " << target->getName() << endl;

        target->takeDamage(attackPower);

    }public:

    Boss(string n): Entity(n, 150,  25){}

 

    void attack(Entity* target) override {

        cout << "\n> " << name << " unleashes a DEVASTATING SLAM on " << target->getName() << endl;

        target->takeDamage(attackPower +10);

 

    } 
    IInteractable {

private:

    bool isOpened = false;

public:

    void interact() override {

        if (!isOpened) {

            cout << "\n[!] You open the glowing chest and find 100 Gold!\n";

            isOpened = true;

 

        }else {

            cout << "\n [!] The chest is already empty.\n";

            

        }

    }
    



};