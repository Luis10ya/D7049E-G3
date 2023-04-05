import os

os.chdir("reactphysics3d")
try:
    os.mkdir("build")
except:
    pass
os.chdir("build")
os.system("cmake ..")
os.system("make")

os.chdir("..")
os.chdir("..")
os.chdir("ogre")
try:
    os.mkdir("build")
except:
    pass
os.chdir("build")
os.system("cmake ..")
os.system("make")