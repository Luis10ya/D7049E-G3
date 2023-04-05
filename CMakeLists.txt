cmake_minimum_required(VERSION 3.5)

project(mygame)

# Set the C++ standard to C++11
set(CMAKE_CXX_STANDARD 11)

# Include directories
include_directories(
    ./ogre/OgreMain/include
    ./ogre/build/include
    ./reactphysics3d/include
    ./irrKlang/include
)

# Link directories
link_directories(
    ./reactphysics3d/build
    /usr/lib
)

if(WIN32)
    if(CMAKE_SIZEOF_VOID_P EQUAL 8)
        link_directories(./irrKlang/bin/winx64-visualStudio)
    endif()
elseif(APPLE)
    link_directories(./irrKlang/bin/macosx-gcc)
elseif(UNIX)
    link_directories(./irrKlang/bin/linux-gcc-64)
endif()


# Add the source file
add_executable(mygame main.cpp)

# Link libraries
target_link_libraries(mygame
    OgreMain
    reactphysics3d
    IrrKlang
)